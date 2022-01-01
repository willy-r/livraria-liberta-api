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

module.exports = {
  InvalidArgumentError,
  InternalServerError,
  EntityNotFoundError,
};
