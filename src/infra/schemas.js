const criaTabelaLivro = `
  CREATE TABLE IF NOT EXISTS livro (
    id_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ISBN VARCHAR(13) UNIQUE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    url_img VARCHAR(255) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    paginas INT NOT NULL,
    ano_publicacao YEAR NOT NULL,
    editora VARCHAR(255),
    autor VARCHAR(255)
  );
`;

const criaTabelaUsuario = `
  CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    CPF VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    url_img VARCHAR(255) NOT NULL
  );
`;

module.exports = {
  criaTabelaLivro,
  criaTabelaUsuario,
};
