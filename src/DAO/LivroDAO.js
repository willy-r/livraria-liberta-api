const dbConexao = require('../infra/dbConexao');
const { InternalServerError } = require('../erros/erros');

class LivroDAO {
  static buscaLivros(params) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM livro`;

      if (Object.entries(params).length === 1) {
        // Tem parâmetros, verifica se são parâmetros válidos.
        const paramsValidos = ['categoria', 'autor'];

        if (paramsValidos.includes(Object.keys(params)[0])) {
          sql += ' WHERE ?;';
        }
      }

      dbConexao.query(sql, params, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results);
      });
    });
  }

  static buscaLivroPeloId(idLivro) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM livro
        WHERE id_livro = ?;
      `;

      dbConexao.query(sql, idLivro, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results[0]);
      });
    });
  }

  static buscaLivroPeloISBN(ISBN) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM livro
        WHERE ISBN = ?;
      `;

      dbConexao.query(sql, ISBN, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results[0]);
      });
    });
  }

  static adicionaLivro(livro) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO livro
        SET ?;
      `;

      dbConexao.query(sql, livro, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results.insertId);
      });
    });
  } 

  static atualizaLivro(livro, idLivro) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE livro
        SET ?
        WHERE id_livro = ?;
      `;

      dbConexao.query(sql, [livro, idLivro], (err) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(idLivro);
      });
    });
  }

  static deletaLivro(idLivro) {
    return new Promise((resolve, reject) => {
      const sql = `
        DELETE FROM livro
        WHERE id_livro = ?;
      `;

      dbConexao.query(sql, idLivro, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results.affectedRows);
      });
    });
  }
}

module.exports = LivroDAO;
