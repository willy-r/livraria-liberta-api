const dbConexao = require('./dbConexao');
const schemas = require('./schemas');

class Tabelas {
  static criaTabelas() {
    for (const key in schemas) {
      dbConexao.query(schemas[key], err => {
        if (err) {
          console.log('ERRO:', err.message);
        }
      });
    }
  }
}

module.exports = Tabelas;
