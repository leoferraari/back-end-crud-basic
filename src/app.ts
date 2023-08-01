import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { customersRoutes } from './http/controllers/customers/routes'

const express = require('express');
const appExpress = express();

const cors = require('cors');

export const app = fastify()

appExpress.use(cors());
app.register(customersRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ messsage: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error. '})
})