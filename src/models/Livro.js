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

  static livroParaAtualizar(livroAntigo, livroNovo) {
    const livroParaAtualizar = {
      ISBN: livroNovo.ISBN || livroAntigo.ISBN,
      titulo: livroNovo.titulo || livroAntigo.titulo,
      descricao: livroNovo.descricao || livroAntigo.descricao,
      categoria: livroNovo.categoria || livroAntigo.categoria,
      url_img: livroNovo.url_img || livroAntigo.url_img,
      preco: livroNovo.preco || livroAntigo.preco,
      paginas: livroNovo.paginas || livroAntigo.paginas,
      ano_publicacao: livroNovo.ano_publicacao || livroAntigo.ano_publicacao,
      editora: livroNovo.editora || livroAntigo.editora,
      autor: livroNovo.autor || livroAntigo.autor,
    };

    return new Livro(livroParaAtualizar);
  }
  
  constructor(livro) {
    this._verificaDados(livro);

    this.ISBN = livro.ISBN;
    this.titulo = livro.titulo;
    this.descricao = livro.descricao;
    this.categoria = livro.categoria;
    this.urlImg = livro.url_img;
    this.preco = livro.preco;
    this.paginas = livro.paginas;
    this.anoPublicacao = livro.ano_publicacao;
    this.editora = livro.editora;
    this.autor = livro.autor;
  }

  _verificaDados(livro) {
    this._verificaISBN(livro.ISBN);
    this._verificaTitulo(livro.titulo);
    this._verificaDescricao(livro.descricao);
    this._verificaCategoria(livro.categoria);
    this._verificaUrlImg(livro.url_img);
    this._verificaPreco(livro.preco);
    this._verificaPaginas(livro.paginas);
    this._verificaAnoPublicacao(livro.ano_publicacao);
    this._verificaEditora(livro.editora);
    this._verificaAutor(livro.autor);
  }

  _verificaISBN(ISBN) {
    if (ISBN === undefined) {
      throw new InvalidArgumentError('ISBN é obrigatório.');
    }

    if (ISBN.length !== 10 && ISBN.length !== 13) {
      throw new InvalidArgumentError('ISBN inválido, deve conter 10 ou 13 caracteres.');
    }
  }

  _verificaTitulo(titulo) {
    if (titulo === undefined) {
      throw new InvalidArgumentError('titulo é obrigatório.');
    }

    if (titulo.length > 255) {
      throw new InvalidArgumentError('titulo inválido, deve ter no máximo 255 caracteres.');
    }
  }

  _verificaDescricao(descricao) {
    if (descricao === undefined) {
      throw new InvalidArgumentError('descricao é obrigatório.');
    }
  }

  _verificaCategoria(categoria) {
    if (categoria === undefined) {
      throw new InvalidArgumentError('categoria é obrigatório.');
    }

    if (categoria.length > 255) {
      throw new InvalidArgumentError('categoria inválido, deve ter no máximo 255 caracteres.');
    }
  }

  _verificaUrlImg(urlImg) {
    if (urlImg === undefined) {
      throw new InvalidArgumentError('img_url é obrigatório.');
    }

    if (urlImg.length > 255) {
      throw new InvalidArgumentError('img_url inválido, deve ter no máximo 255 caracteres.');
    }

    const regex = /^(http(s)?):\/\/[^ "]+$/;
    if (!regex.test(urlImg)) {
      throw new InvalidArgumentError('img_url deve ser uma URL válida.');
    }
  }

  _verificaPreco(preco) {
    if (preco === undefined) {
      throw new InvalidArgumentError('preco é obrigatório.');
    }

    if (typeof preco !== 'number' || preco < 0) {
      throw new InvalidArgumentError('preco inválido, deve ser um número maior que 0.');
    }
  }

  _verificaPaginas(paginas) {
    if (paginas === undefined) {
      throw new InvalidArgumentError('paginas é obrigatório.');
    }

    if (typeof paginas !== 'number' || paginas < 0) {
      throw new InvalidArgumentError('paginas inválido, deve ser um número maior que 0.');
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
  
  _verificaEditora(editora) {
    if (editora === undefined) {
      throw new InvalidArgumentError('editora é obrigatório.');
    }

    if (editora.length > 255) {
      throw new InvalidArgumentError('editora inválido, deve ter no máximo 255 caracteres.');
    }
  }

  _verificaAutor(autor) {
    if (autor === undefined) {
      throw new InvalidArgumentError('autor é obrigatório.');
    }

    if (autor.length > 255) {
      throw new InvalidArgumentError('autor inválido, deve ter no máximo 255 caracteres.');
    }
  }
}

module.exports = Livro;
