const dbConexao = require('../infra/dbConexao');
const { InternalServerError } = require('../erros/erros');

class TokensResetarSenhaDAO {
  static buscaToken(token) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM tokens_resetar_senha
        WHERE token = ?;
      `;

      dbConexao.query(sql, token, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results[0]);
      });
    });
  }

  static adicionaToken(tokenInfo) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO tokens_resetar_senha
          (token, expira_em, id_usuario)
        VALUES
          (?, ?, ?)
        ;
      `;
      const params = Object.values(tokenInfo);
      
      dbConexao.query(sql, params, (err) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(params[0]);
      });
    });
  }

  static deletaTokensDoUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
      const sql = `
        DELETE FROM tokens_resetar_senha
        WHERE id_usuario = ?;
      `;

      dbConexao.query(sql, idUsuario, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results.affectedRows);
      });
    });
  }
}

module.exports = TokensResetarSenhaDAO;
