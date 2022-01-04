const bcrypt = require('bcrypt');

const UsuarioDAO = require("../DAO/UsuarioDAO");
const { EntityNotFoundError, InvalidArgumentError } = require("../erros/erros");

class Usuario {
  static async verificaUsuarioExiste(idUsuario) {
    const usuario = await UsuarioDAO.buscaUsuarioPeloId(idUsuario);

    if (!usuario) {
      throw new EntityNotFoundError(`ERRO: usuário com ID ${idUsuario} não encontrado.`);
    }

    return usuario;
  }

  static async criptografaSenha(senha) {
    const custoHash = 10;
    return bcrypt.hash(senha, custoHash);
  }

  constructor(usuario) {
    this._verificaDados(usuario);

    this.CPF = usuario.CPF;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.endereco = usuario.endereco ? usuario.endereco : '';
    this.urlImg = usuario.url_img;
  }

  _verificaDados(usuario) {
    this._verificaCPF(usuario.CPF);
    this._verificaNome(usuario.nome);
    this._verificaEmail(usuario.email);
    this._verificaSenha(usuario.senha);
    this._verificaEndereco(usuario.endereco);
    this._verificaUrlImg(usuario.url_img);
  }

  _verificaCPF(CPF) {
    if (CPF === undefined) {
      throw new InvalidArgumentError('CPF é obrigatório.');
    }
    
    const regex = /\d{11}/;
    if (!regex.test(CPF)) {
      throw new InvalidArgumentError('CPF inválido, deve conter 11 números.');
    }
  }

  _verificaNome(nome) {
    if (nome === undefined) {
      throw new InvalidArgumentError('nome é obrigatório.');
    }

    if (nome.length > 255) {
      throw new InvalidArgumentError('nome inválido, deve ter no máximo 255 caracteres.');
    }
  }

  _verificaEmail(email) {
    if (email === undefined) {
      throw new InvalidArgumentError('email é obrigatório.');
    }
    
    const regex = /^\S+@\S+$/;
    if (!regex.test(email)) {
      throw new InvalidArgumentError('email deve ser um endereço de email válido.');
    }
  }

  _verificaSenha(senha) {
    if (senha === undefined) {
      throw new InvalidArgumentError('senha é obrigatória.');
    }

    if (senha.length < 6) {
      throw new InvalidArgumentError('senha inválida, deve conter no mínimo 6 caracteres.');
    }
  }

  _verificaEndereco(endereco) {
    if (endereco?.length > 255) {
      throw new InvalidArgumentError('endereco inválido, deve ter no máximo 255 caracteres.');
    }
  }

  _verificaUrlImg(urlImg) {
    if (urlImg === undefined) {
      throw new InvalidArgumentError('img_url é obrigatório.');
    }

    if (urlImg.length > 255) {
      throw new InvalidArgumentError('img_url inválida, deve ter no máximo 255 caracteres.');
    }

    const regex = /^(http(s)?):\/\/[^ "]+$/;
    if (!regex.test(urlImg)) {
      throw new InvalidArgumentError('img_url deve ser uma URL válida.');
    }
  }

  async adicionaSenhaCriptografada() {
    this.senha = await Usuario.criptografaSenha(this.senha);;
  }
}

module.exports = Usuario;
