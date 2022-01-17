class InvalidArgumentError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'InvalidArgumentError';
    this.codStatus = 400;
  }
}

class InternalServerError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'InternalServerError';
    this.codStatus = 500;
  }
}

class EntityNotFoundError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'EntityNotFoundError';
    this.codStatus = 404;
  }
}

class InvalidTokenError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'InvalidTokenError';
    this.codStatus = 400;
  }
}

class TokenExpiredError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'TokenExpiredError';
    this.codStatus = 400;
  }
}

module.exports = {
  InvalidArgumentError,
  InternalServerError,
  EntityNotFoundError,
  InvalidTokenError,
  TokenExpiredError,
};
