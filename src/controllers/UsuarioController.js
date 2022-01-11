const UsuarioDAO = require('../DAO/UsuarioDAO');
const Usuario = require('../models/Usuario');
const AutenticacaoMiddleware = require('../middlewares/AutenticacaoMiddleware');
const { InvalidArgumentError } = require('../erros/erros');

const UsuarioController = (app) => {
  app.get('/api/usuario/todos', async (_, res) => {
    try {
      const usuarios = await UsuarioDAO.buscaUsuarios();

      res.status(200).json({
        erro: false,
        usuarios: usuarios,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.get('/api/usuario/:id', AutenticacaoMiddleware.bearer, async (req, res) => {
    const idUsuario = parseInt(req.params.id);

    try {
      const usuario = await Usuario.verificaUsuarioExistePeloId(idUsuario);

      res.status(200).json({
        erro: false,
        usuario: usuario,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.post('/api/usuario', async (req, res) => {
    const camposUsuario = { ...req.body };

    try {
      const usuario = new Usuario(camposUsuario);

      if (await UsuarioDAO.buscaUsuarioPeloEmail(usuario.email)) {
        throw new InvalidArgumentError('Usuário com este endereço de email já existe!');
      }

      if (await UsuarioDAO.buscaUsuarioPeloCPF(usuario.CPF)) {
        throw new InvalidArgumentError('Usuário com este CPF já existe!');
      }

      await usuario.adicionaSenhaCriptografada();
      
      const idUsuario = await UsuarioDAO.adicionaUsuario(usuario);

      res.status(201).json({
        erro: false,
        idUsuario: idUsuario,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.patch('/api/usuario/:id', AutenticacaoMiddleware.bearer, async (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const camposUsuario = { ...req.body };

    try {
      const usuarioAntigo = await Usuario.verificaUsuarioExistePeloId(idUsuario);
      const usuario = Usuario.usuarioParaAtualizar(usuarioAntigo, camposUsuario);

      if (await UsuarioDAO.buscaUsuarioPeloEmail(usuario.email) && usuario.email !== usuarioAntigo.email) {
        throw new InvalidArgumentError('Usuário com este endereço de email já existe!');
      }

      if (await UsuarioDAO.buscaUsuarioPeloCPF(usuario.CPF) && usuario.CPF !== usuarioAntigo.CPF) {
        throw new InvalidArgumentError('Usuário com este CPF já existe!');
      }

      if (usuario.senha !== usuarioAntigo.senha) {
        await usuario.adicionaSenhaCriptografada();
      }
      
      await UsuarioDAO.atualizaUsuario(usuario, idUsuario);

      res.status(200).json({
        erro: false,
        idUsuario: idUsuario,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.delete('/api/usuario/:id', AutenticacaoMiddleware.bearer, async (req, res) => {
    const idUsuario = parseInt(req.params.id);

    try {
      await Usuario.verificaUsuarioExistePeloId(idUsuario);

      await UsuarioDAO.deletaUsuario(idUsuario);

      res.status(200).json({
        erro: false,
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

module.exports = UsuarioController;
