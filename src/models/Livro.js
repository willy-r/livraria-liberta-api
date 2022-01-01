const LivroDAO = require('../DAO/LivroDAO');
const { InvalidArgumentError, EntityNotFoundError } = require('../erros/erros');

class Livro {
  static async verificaId(idLivro) {
    if (await LivroDAO.buscaLivroPeloId(idLivro) === undefined) {
      throw new EntityNotFoundError(`ERRO: livro com ID ${idLivro} não encontrado.`);
    }
  }
  
  static async verificaISBN(ISBN) {
    if (await LivroDAO.buscaLivroPeloISBN(ISBN) !== undefined) {
      throw new InvalidArgumentError(`O livro com o ISBN ${ISBN} já existe.`);
    }
  }
  
  constructor(livro) {
    this._verificaDados(livro);

    this.livroVerificado = livro;
  }

  _verificaDados(livro) {
    this._verificaISBN(livro.ISBN);
    this._verificaUrlImg(livro.url_img);
    this._verificaAnoPublicacao(livro.ano_publicacao);
  }

  _verificaISBN(ISBN) {
    if (ISBN === undefined) {
      throw new InvalidArgumentError('ISBN é obrigatório.');
    }

    if (ISBN.length !== 10 && ISBN.length !== 13) {
      throw new InvalidArgumentError('ISBN inválido, deve conter 10 ou 13 caracteres.');
    }
  }

  _verificaUrlImg(urlImg) {
    if (urlImg === undefined) {
      throw new InvalidArgumentError('img_url é obrigatório.');
    }

    if (urlImg.length > 255) {
      throw new InvalidArgumentError('img_url deve ter no máximo 255 caracteres.');
    }

    const regex = /^(http(s)?):\/\/[^ "]+$/;
    if (!regex.test(urlImg)) {
      throw new InvalidArgumentError('img_url deve ser uma URL válida.');
    }
  }

  _verificaAnoPublicacao(anoPublicacao) {
    if (anoPublicacao === undefined) {
      throw new InvalidArgumentError('ano_publicacao é obrigatório.');
    }

    const regex = /\d{4}/;
    if (!regex.test(anoPublicacao.toString())) {
      throw new InvalidArgumentError('ano_publicacao inválido, deve estar no formato YYYY.');
    }

    const anoAtual = new Date().getFullYear();
    if (anoPublicacao > anoAtual) {
      throw new InvalidArgumentError('ano_publicacao inválido, não deve estar no futuro.');
    }
  }
}

module.exports = Livro;
