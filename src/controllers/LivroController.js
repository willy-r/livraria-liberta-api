const LivroDAO = require('../DAO/LivroDAO');
const Livro = require('../models/Livro');

const LivroController = (app) => {
  app.get('/api/livro/todos', async (_, res) => {
    try {
      const livros = await LivroDAO.buscaLivros();
      
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

  app.post('/api/livro', async (req, res) => {
    const camposLivro = { ...req.body };

    try {
      const livro = new Livro(camposLivro).livroVerificado;
      
      await Livro.verificaISBNExiste(livro.ISBN);

      const idLivroCriado = await LivroDAO.adicionaLivro(livro);
      const livroCriado = await LivroDAO.buscaLivroPeloId(idLivroCriado);

      res.status(201).json({
        erro: false,
        livroCriado: livroCriado,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.patch('/api/livro/:id', async (req, res) => {
    const camposLivro = { ...req.body };
    const idLivro = parseInt(req.params.id);

    try { 
      const livroAntigo = await Livro.verificaLivroExiste(idLivro);
      const livro = Livro.livroParaAtualizar(camposLivro, livroAntigo);
      
      await Livro.verificaISBNExiste(livro.ISBN);

      await LivroDAO.atualizaLivro(livro, idLivro);

      res.status(200).json({
        erro: false,
        camposAtualizados: camposLivro,
        idLivro: idLivro,
      });
    } catch (err) {
      res.status(err.codStatus).json({
        erro: true,
        msg: err.message,
      });
    }
  });

  app.delete('/api/livro/:id', async (req, res) => {
    const idLivro = parseInt(req.params.id);

    try {
      const livro = await Livro.verificaLivroExiste(idLivro);
      
      await LivroDAO.deletaLivro(idLivro);
      
      res.status(200).json({
        erro: false,
        msg: `Livro '${livro.titulo.length > 25 ? livro.titulo.slice(0, 25) + '...' : livro.titulo}' deletado.`,
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
