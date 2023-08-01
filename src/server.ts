import { app } from './app'
import { env } from './env'

const fastify = require('fastify')();
const cors = require('fastify-cors');
fastify.register(cors);

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('🚀 HTTP Server Running!')
})