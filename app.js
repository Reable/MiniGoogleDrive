const fastify = require('fastify');

const app = fastify({ logger: true });

app.get('/', async( req, reply) => {
    return 'Hello world / '
})

app.post('/post', async( req, reply) => {
    return 'Hello world'
})

app.listen(3000, (err, address) => {
    if(err){
        app.log.error(err)
    }

    app.log.info('server is running ', address)

})

