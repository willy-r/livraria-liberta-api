const dbConexao = require('../infra/dbConexao');
const { InternalServerError } = require('../erros/erros');

class UsuarioDAO {
  static buscaUsuarios() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM usuario';

      dbConexao.query(sql, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results);
      });
    });
  }
}

module.exports = UsuarioDAO;
