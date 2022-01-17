const dayjs = require('dayjs');

const TokensResetarSenhaDAO = require('../DAO/TokensResetarSenhaDAO');
const { InvalidTokenError, TokenExpiredError } = require('../erros/erros');

class TokensResetarSenha {
  static async verificaTokenExiste(token) {
    const tokenInfo = await TokensResetarSenhaDAO.buscaToken(token);

    if (!tokenInfo) {
      throw new InvalidTokenError('Token para reset de senha inválido.');
    }

    return tokenInfo;
  }

  static verificaTokenExpirou(tokenExpiraEm) {
    const agora = dayjs();
    const dataExpiracao = dayjs(tokenExpiraEm);
    
    if (agora.isAfter(dataExpiracao)) {
      throw new TokenExpiredError('Token expirou, tente novamente.');
    }
  }
}

module.exports = TokensResetarSenha;
