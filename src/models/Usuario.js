const UsuarioDAO = require("../DAO/UsuarioDAO");
const { EntityNotFoundError } = require("../erros/erros");

class Usuario {
  static async verificaUsuarioExiste(idUsuario) {
    const usuario = await UsuarioDAO.buscaUsuarioPeloId(idUsuario);

    if (!usuario) {
      throw new EntityNotFoundError(`ERRO: usuário com ID ${idUsuario} não encontrado.`);
    }

    return usuario;
  }
}

module.exports = Usuario;
