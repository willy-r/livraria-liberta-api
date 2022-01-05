# Livraria Liberta API

Back-end da livraria Liberta, para o projeto do módulo 05 da @resilia-br, feito com NodeJS e Express.

## Livraria Liberta (Front-end)

- TODO


## Variáveis de ambiente

As seguintes variáveis de ambiente precisam ser definidas para o funcionamento correto do projeto, elas podem ser encontradas em [`.env.example`](./.env.example).

### Banco de dados

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

### Json Web Token

- `JWT_KEY`


## Rodar localmente

No terminal de sua escolha, clone o repositório:

```bash
git clone https://github.com/willy-r/livraria-liberta-api.git
```

Vá até o diretório do projeto:

```bash
cd livraria-liberta-api
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm run dev
```

> Isso irá criar o servidor, e as tabelas do banco de dados se a conexão com o mesmo for bem sucedida.


## Referência da API

Para mais informações sobre cada rota em particular de cada entidade, por favor consulte a [wiki](https://github.com/willy-r/livraria-liberta-api/wiki) do projeto.

### Rotas (Entidade Livro)

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| **GET** | `/api/livro/todos` | Lista todos os livros |
| **GET** | `/api/livro/{id}` | Busca o livro pelo {id} |
| **POST** | `/api/livro` | Adiciona novo livro |
| **PATCH** | `/api/livro/{id}` | Atualiza livro pelo {id} |
| **DELETE** | `/api/livro/{id}` | Deleta o livro pelo {id} |

### Rotas (Entidade Usuário)

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| **GET** | `/api/usuario/todos` | Lista todos os usuários |
| **GET** | `/api/usuario/{id}` | Busca o usuário pelo {id} |
| **POST** | `/api/usuario` | Adiciona novo usuário |
| **PATCH** | `/api/usuario/{id}` | Atualiza usuário pelo {id} |
| **DELETE** | `/api/usuario/{id}` | Deleta o usuário pelo {id} |


## Informações gerais

Esse projeto foi feito usando a versão **14.18.1** do *NodeJS*.

### Tecnologias utilizadas

Essas são algumas das bibliotecas e frameworks utilizadas no projeto.

**Servidor:**

- [NodeJS](https://nodejs.org/en/)
- [Express](http://expressjs.com/)]

**Autenticação & Segurança:**

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

**Banco de Dados:**

- [mysql](https://www.npmjs.com/package/mysql)


## Autor

- [William Rodrigues](https://github.com/willy-r)
