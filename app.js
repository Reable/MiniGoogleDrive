const app = require('fastify')({logger: {level: 'info'}});

const dbConnector = require('./plugins/db-connection');

app.register(dbConnector)

app.get('/', async( request, reply) => {
    return reply.code(201).send({hello: 'hello world!!!'})
        .then(() => {
            console.log('res sent')
        })
})

const opts = {
    schema: {
      body: {
        type: 'object',
        properties: {
          someKey: { type: 'string' },
          someOtherKey: { type: 'number' }
        }
      }
    }
}

app.post('/post', opts, async( req, reply) => {
    console.log(req.body)
    return 'Hello world'
})

app.listen({ port: 3000 }, function (err, address) {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`Server has address = ${address}`)
})

