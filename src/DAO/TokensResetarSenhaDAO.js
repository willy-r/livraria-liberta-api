const dbConexao = require('../infra/dbConexao');
const { InternalServerError } = require('../erros/erros');

class TokensResetarSenhaDAO {
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
}

module.exports = TokensResetarSenhaDAO;
