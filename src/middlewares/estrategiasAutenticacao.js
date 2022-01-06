const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');
const { contemTokenNaLista } = require('../redis/manipulaBlacklist');

const verificaTokenNaBlacklist = async token => {
  const tokenNaBlacklist = await contemTokenNaLista(token);
  
  if (tokenNaBlacklist) {
    throw new jwt.JsonWebTokenError('Token inválido por logout!');
  }
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    session: false,
  },
  async (email, senha, done) => {
    try {
      const usuario = await Usuario.verificaUsuarioExistePeloEmail(email);
      
      // Verificações.
      await Usuario.verificaSenha(senha, usuario.senha);
      
      // A partir daqui o usuário está verificado com sucesso.
      // Usuário é então autenticado.
      done(null, usuario);
    } catch (err) {
      done(err);
    }
  }
));

passport.use(new BearerStrategy(
  async (token, done) => {
    try {
      await verificaTokenNaBlacklist(token);

      const payload = jwt.verify(token, process.env.JWT_KEY);
      const usuario = await Usuario.verificaUsuarioExistePeloId(payload.id_usuario);

      done(null, usuario, { token: token });
    } catch (err) {
      done(err);
    }
  }
));
