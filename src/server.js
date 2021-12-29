require('dotenv').config();

const customApp = require('./config/customApp');
const db = require('./infra/db');
const Tabelas = require('./infra/Tabelas');

db.connect(err => {
  if (err) {
    return console.log('ERRO:', err.message);
  }

  // Banco de dados, cria as tabelas.
  Tabelas.criaTabelas(db);

  // Cria o app e inicia o servidor.
  const app = customApp();
  const PORTA = process.env.PORT || 3000;

  app.listen(PORTA, () => console.log(`Server rodando na PORTA: ⚡${PORTA}`));
});
