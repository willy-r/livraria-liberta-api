require('dotenv').config();

const customApp = require('./config/customApp');
const dbConexao = require('./infra/dbConexao');
const Tabelas = require('./infra/Tabelas');

dbConexao.connect(err => {
  if (err) {
    return console.log('ERRO:', err.message);
  }

  // Cria as tabelas.
  Tabelas.criaTabelas();

  // Cria o app e inicia o servidor.
  const app = customApp();
  const PORTA = process.env.PORT || 3000;

  app.listen(PORTA, () => console.log(`Server rodando na PORTA: ⚡${PORTA}`));
});
