const { randomBytes, createHash } = require('crypto');

const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const Usuario = require('../models/Usuario');
const UsuarioDAO = require('../DAO/UsuarioDAO');
const TokensResetarSenha = require('../models/TokensResetarSenha');
const TokensResetarSenhaDAO = require('../DAO/TokensResetarSenhaDAO');
const AutenticacaoMiddleware = require('../middlewares/AutenticacaoMiddleware');

const { adicionaNaLista } = require('../redis/manipulaBlacklist');
const mailer = require('../mailer/mailer');

const AutenticacaoController = (app) => {
  app.post('/api/auth/login', AutenticacaoMiddleware.local, (req, res) => {
    // Cria o payload com o usuário já verificado.
    const payload = { id_usuario: req.user.id_usuario };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

    // Com o token em mãos, seta o cabeçalho Authorization para verificação posterior.
    res.set('Authorization', token);
    res.status(200).json({
      idUsuario: req.user.id_usuario,
      token: token,
    });
  });

  app.get('/api/auth/logout', AutenticacaoMiddleware.bearer, async (req, res) => {
    const token = req.token;

    try {
      await adicionaNaLista(token);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.post('/api/auth/esqueceu-senha', async (req, res) => {
    const email = req.body.email;

    try {
      const usuario = await Usuario.verificaUsuarioExistePeloEmail(email);
      
      // Gera um token aleatório.
      const token = randomBytes(48).toString('hex');
      // Gera um hash desse token.
      // Isso significa que um usuário vai poder ter vários tokens no banco de dados.
      const tokenHash = createHash('SHA256').update(token).digest('hex');

      // Cria data de expiração (máximo 1h a partir do momento de criação do token)
      const tokenExpiraEm = dayjs().add(1, 'h').format('YYYY-MM-DD HH:mm:ss');

      await TokensResetarSenhaDAO.adicionaToken({
        token: tokenHash,
        tokenExpiraEm: tokenExpiraEm,
        idUsuario: usuario.id_usuario,
      });
      
      // Envia o email para o usuário.
      mailer.sendMail({
        from: `"Livraria Liberta" <${process.env.MAIL_FROM}>`,
        to: email,
        subject: 'Recuperação de senha para sua conta na Liberta',
        template: 'esqueceu-senha',
        context: { link: `${process.env.CLIENT_URL}/resetar-senha?token=${token}` },
      }, (err) => {
        if (err) {
          return res.status(400).json({
            erro: true,
            msg: 'Erro ao enviar o email!',
          });
        }

        res.status(200).json({
          erro: false,
          msg: 'O email foi enviado com sucesso!',
        });
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.post('/api/auth/resetar-senha', async (req, res) => {
    const resetInfo = { ...req.body };
    const tokenHash = createHash('SHA256').update(resetInfo.token).digest('hex');

    try {
      // Verifica se o token existe.
      const tokenInfo = await TokensResetarSenha.verificaTokenExiste(tokenHash);
      const idUsuario = tokenInfo.id_usuario;

      // Deleta todos os outros tokens do usuário.
      await TokensResetarSenhaDAO.deletaTokensDoUsuario(idUsuario);
      
      TokensResetarSenha.verificaTokenExpirou(tokenInfo.expira_em);

      // Faz a lógica para atualizar a senha do usuário.
      const usuarioAntigo = await UsuarioDAO.buscaUsuarioPeloId(idUsuario);
      const usuario = Usuario.usuarioParaAtualizar(usuarioAntigo, { senha: resetInfo.senha });
      await usuario.adicionaSenhaCriptografada();

      await UsuarioDAO.atualizaUsuario(usuario, idUsuario);

      res.status(200).json({
        erro: false,
        msg: 'Senha atulizada com sucesso!',
        idUsuario: idUsuario,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });
}

module.exports = AutenticacaoController;
