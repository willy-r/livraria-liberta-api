const jwt = require('jsonwebtoken');

const AutenticacaoMiddleware = require('../middlewares/AutenticacaoMiddleware');
const { adicionaNaLista } = require('../redis/manipulaBlacklist');

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
}

module.exports = AutenticacaoController;
