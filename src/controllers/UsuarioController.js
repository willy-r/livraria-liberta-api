const UsuarioDAO = require('../DAO/UsuarioDAO');
const Usuario = require('../models/Usuario');
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
}

module.exports = UsuarioController;
