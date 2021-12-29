const schemas = require('./schemas');

class Tabelas {
  static criaTabelas(db) {
    for (const key in schemas) {
      db.query(schemas[key], err => {
        if (err) {
          console.log('ERRO:', err.message);
        }
      });
    }
  }
}

module.exports = Tabelas;
