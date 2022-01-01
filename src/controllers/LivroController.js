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
      // Verifica se o livro existe, se não existir um erro é gerado.
      await Livro.verificaId(idLivro);
      
      const livro = await LivroDAO.buscaLivroPeloId(idLivro);

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
    const livroReq = { ...req.body };

    try {
      const livro = new Livro(livroReq).livroVerificado;
      
      // Verifica se ISBN já existe, se existir um erro é gerado.
      await Livro.verificaISBN(livro.ISBN);

      const livroCriadoId = await LivroDAO.adicionaLivro(livro);
      const livroCriado = await LivroDAO.buscaLivroPeloId(livroCriadoId);

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

  app.delete('/api/livro/:id', async (req, res) => {
    const idLivro = parseInt(req.params.id);

    try {
      // Verifica se o livro existe.
      const livro = await LivroDAO.buscaLivroPeloId(idLivro);
      // Deleta o livro se existir.
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
