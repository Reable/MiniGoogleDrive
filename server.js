const fastify = require('fastify');

const server = fastify({ logger: true });

server
    .listen(3000)
    .catch(console.error)

module.exports = server;