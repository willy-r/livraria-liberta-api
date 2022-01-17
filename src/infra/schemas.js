const criaTabelaLivro = `
  CREATE TABLE IF NOT EXISTS livro (
    id_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ISBN VARCHAR(13) UNIQUE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    url_img VARCHAR(255) NOT NULL,
    preco FLOAT(10, 2) NOT NULL,
    paginas INT NOT NULL,
    ano_publicacao YEAR NOT NULL,
    editora VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL
  );
`;

const criaTabelaUsuario = `
  CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    CPF VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    url_img VARCHAR(255) NOT NULL
  );
`;

const criaTabelaTokensResetarSenha = `
  CREATE TABLE IF NOT EXISTS tokens_resetar_senha (
    token VARCHAR(255) PRIMARY KEY NOT NULL,
    expira_em DATETIME NOT NULL,
    id_usuario INT NOT NULL
  );
`;

module.exports = {
  criaTabelaLivro,
  criaTabelaUsuario,
  criaTabelaTokensResetarSenha,
};
