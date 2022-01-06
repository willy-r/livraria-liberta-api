const jwt = require('jsonwebtoken');

const AutenticacaoMiddleware = require('../middlewares/AutenticacaoMiddleware');

const AutenticacaoController = (app) => {
  app.post('/api/auth/login', AutenticacaoMiddleware.local, (req, res) => {
    // Cria o payload com o usuário já verificado.
    const payload = { id_usuario: req.user.id_usuario };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '5 days' });

    // Com o token em mãos, seta o cabeçalho Authorization para verificação posterior.
    res.set('Authorization', token);
    res.sendStatus(204);
  });
}

module.exports = AutenticacaoController;
