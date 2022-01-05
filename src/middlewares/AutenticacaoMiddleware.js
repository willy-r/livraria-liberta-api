const passport = require('passport');

const local = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, usuario) => {
      // Erro de autenticação, usuario não existe ou email ou senha incorretos.
      if (err?.name === 'InvalidArgumentError') {
        return res.status(401).json({
          erro: true,
          msg: err.message,
        });
      }

      // Erros internos.
      if (err) {
        return res.status(500).json({
          erro: true,
          msg: err.message,
        });
      }

      // Input mal formatado.
      if (!usuario) {
        return res.status(401).json({
          erro: true,
          msg: 'Erro ao tentar autenticar, email e senha requeridos.',
        });
      }
      
      req.user = usuario;
      next();
    }
  )(req, res, next);
}

const bearer = (req, res, next) => {
  passport.authenticate(
    'bearer',
    { session: false },
    (err, usuario, info) => {
      if (err?.name === 'JsonWebTokenError') {
        return res.status(401).json({
          erro: true,
          msg: err.message,
        });
      }

      if (err?.name === 'TokenExpiredError') {
        return res.status(401).json({
          erro: true,
          expiradoEm: err.expiredAt, // Atributo do erro TokenExpiredError
          msg: err.message,
        });
      }

      if (err) {
        return res.status(500).json({
          erro: true,
          msg: err.message,
        });
      }

      if (!usuario) {
        return res.status(401).json({
          erro: true,
          msg: 'Erro ao tentar autenticar, email e senha requeridos.',
        });
      }

      req.token = info.token;
      req.user = usuario;
      next();
    }
  )(req, res, next);
}

module.exports = {
  local,
  bearer,
};
