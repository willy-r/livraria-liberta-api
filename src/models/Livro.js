const LivroDAO = require('../DAO/LivroDAO');
const { InvalidArgumentError, EntityNotFoundError } = require('../erros/erros');

class Livro {
  static async verificaLivroExiste(idLivro) {
    const livro = await LivroDAO.buscaLivroPeloId(idLivro);

    if (!livro) {
      throw new EntityNotFoundError(`ERRO: livro com ID ${idLivro} não encontrado.`);
    }

    return livro;
  }
  
  static async verificaISBNExiste(ISBN) {
    const livro = await LivroDAO.buscaLivroPeloISBN(ISBN);

    if (livro && ISBN !== livro.ISBN) {
      throw new InvalidArgumentError(`O livro com o ISBN ${ISBN} já existe.`);
    }
  }
  
  static livroParaAtualizar(camposLivro, livroAntigo) {
    const camposParaAtualizar = {
      ISBN: camposLivro.ISBN || livroAntigo.ISBN,
      titulo: camposLivro.titulo || livroAntigo.titulo,
      descricao: camposLivro.descricao || livroAntigo.descricao,
      categoria: camposLivro.categoria || livroAntigo.categoria,
      url_img: camposLivro.url_img || livroAntigo.url_img,
      preco: camposLivro.preco || livroAntigo.preco,
      paginas: camposLivro.paginas || livroAntigo.paginas,
      ano_publicacao: camposLivro.ano_publicacao || livroAntigo.ano_publicacao,
      editora: camposLivro.editora || livroAntigo.editora,
      autor: camposLivro.autor || livroAntigo.autor,
    };
  
    return new Livro(camposParaAtualizar).livroVerificado;
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
