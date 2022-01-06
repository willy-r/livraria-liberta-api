const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URL,
});

client.connect();

module.exports = client;
