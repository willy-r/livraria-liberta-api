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

  static buscaUsuarioPeloId(idUsuario) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM usuario
        WHERE id_usuario = ?;
      `;

      dbConexao.query(sql, idUsuario, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results[0]);
      });
    });
  }

  static buscaUsuarioPeloEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM usuario
        WHERE email = ?;
      `;

      dbConexao.query(sql, email, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results[0]);
      });
    });
  }

  static buscaUsuarioPeloCPF(CPF) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM usuario
        WHERE CPF = ?;
      `;

      dbConexao.query(sql, CPF, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results[0]);
      });
    });
  }

  static adicionaUsuario(usuario) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO usuario
          (CPF, nome, email, senha, endereco, url_img)
        VALUES
          (?, ?, ?, ?, ?, ?);
      `;
      const params = Object.values(usuario);

      dbConexao.query(sql, params, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results.insertId);
      });
    });
  }

  static atualizaUsuario(usuario, idUsuario) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE usuario
        SET
          CPF = ?,
          nome = ?,
          email = ?,
          senha = ?,
          endereco = ?,
          url_img = ?
        WHERE id_usuario = ?;
      `;
      const params = [...Object.values(usuario), idUsuario];

      dbConexao.query(sql, params, (err, results) => {
        if (err) {
          return reject(new InternalServerError(`ERRO: ${err.message}`));
        }

        resolve(results.changedRows);
      });
    });
  }
}

module.exports = UsuarioDAO;
