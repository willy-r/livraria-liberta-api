const dbConexao = require('../infra/dbConexao');
const { InternalServerError, EntityNotFoundError } = require('../erros/erros');

class LivroDAO {
  static buscaLivros() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM livro;`;

      dbConexao.query(sql, (err, results) => {
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

        if (!results.length) {
          return reject(new EntityNotFoundError(`ERRO: livro com ID ${idLivro} não encontrado.`));
        }

        resolve(results[0]);
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
