const LivroDAO = require('../DAO/LivroDAO');
const Livro = require('../models/Livro');
const AutenticacaoMiddleware = require('../middlewares/AutenticacaoMiddleware');
const { InvalidArgumentError } = require('../erros/erros');

const LivroController = (app) => {
  app.get('/api/livro/todos', async (req, res) => {
    const params = { ...req.query };
    
    try {
      const livros = await LivroDAO.buscaLivros(params);
      
      res.status(200).json({
        erro: false,
        quantidade: livros.length,
        livros: livros,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.get('/api/livro/:id', async (req, res) => {
    const idLivro = parseInt(req.params.id);

    try {
      const livro = await Livro.verificaLivroExiste(idLivro);

      res.status(200).json({
        erro: false,
        livro: livro,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.post('/api/livro', AutenticacaoMiddleware.bearer, async (req, res) => {
    const camposLivro = { ...req.body };

    try {
      const livro = new Livro(camposLivro);
      
      if (await LivroDAO.buscaLivroPeloISBN(livro.ISBN)) {
        throw new InvalidArgumentError(`O livro com o ISBN ${livro.ISBN} já existe.`);
      }

      const idLivro = await LivroDAO.adicionaLivro(livro);

      res.status(201).json({
        erro: false,
        idLivro: idLivro,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.patch('/api/livro/:id', AutenticacaoMiddleware.bearer, async (req, res) => {
    const camposLivro = { ...req.body };
    const idLivro = parseInt(req.params.id);

    try { 
      const livroAntigo = await Livro.verificaLivroExiste(idLivro);
      const livro = Livro.livroParaAtualizar(livroAntigo, camposLivro);
      
      if (await LivroDAO.buscaLivroPeloISBN(livro.ISBN) && livro.ISBN !== livroAntigo.ISBN) {
        throw new InvalidArgumentError(`O livro com o ISBN ${livro.ISBN} já existe.`);
      }

      await LivroDAO.atualizaLivro(livro, idLivro);

      res.status(200).json({
        erro: false,
        idLivro: idLivro,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.delete('/api/livro/:id', AutenticacaoMiddleware.bearer, async (req, res) => {
    const idLivro = parseInt(req.params.id);

    try {
      await Livro.verificaLivroExiste(idLivro);
      
      await LivroDAO.deletaLivro(idLivro);
      
      res.status(200).json({
        erro: false,
        idLivro: idLivro,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });
}

module.exports = LivroController;
