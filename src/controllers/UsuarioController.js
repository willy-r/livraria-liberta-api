const UsuarioDAO = require('../DAO/UsuarioDAO');
const Usuario = require('../models/Usuario');

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

  app.get('/api/usuario/:id', async (req, res) => {
    const idUsuario = parseInt(req.params.id);

    try {
      const usuario = await Usuario.verificaUsuarioExiste(idUsuario);

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
}

module.exports = UsuarioController;
