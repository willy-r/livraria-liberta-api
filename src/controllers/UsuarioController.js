const UsuarioDAO = require('../DAO/UsuarioDAO');

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
}

module.exports = UsuarioController;
