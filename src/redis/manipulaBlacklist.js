const { createHash } = require('crypto');

const jwt = require('jsonwebtoken');

const blacklistTokens = require('./blacklistTokens');

// Função que gera um hash do token para "padronizar" o Token para o Redis.
const geraTokenHash = token => {
  return createHash('SHA256').update(token).digest('hex');
}

const adicionaNaLista = async token => {
  const dataExpiracao = jwt.decode(token).exp;
  const tokenHash = geraTokenHash(token);
  
  await blacklistTokens.set(tokenHash, '');
  await blacklistTokens.expireAt(tokenHash, dataExpiracao);
}

const contemTokenNaLista = async token => {
  const tokenHash = geraTokenHash(token);
  const resultado = await blacklistTokens.exists(tokenHash);

  return resultado;
}

module.exports = {
  adicionaNaLista,
  contemTokenNaLista,
};