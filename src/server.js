require('dotenv').config();

const customApp = require('./config/customApp');
const Tabelas = require('./infra/Tabelas');

// Cria as tabelas.
Tabelas.criaTabelas();

// Cria o app e inicia o servidor.
const app = customApp();
const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => console.log(`Server rodando na PORTA: ⚡${PORTA}`));
