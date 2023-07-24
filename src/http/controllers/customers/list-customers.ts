import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListCustomersUseCase } from '@/use-cases/factories/make-list-customers-use-case'

export async function listCustomers (request: FastifyRequest, reply: FastifyReply) {

    try {
        const registerUseCase = makeListCustomersUseCase()

        const customers = await registerUseCase.execute()

        return reply.status(200).send({
            customers
        })
    } catch(err) {

        return reply.status(500).send()
    }

    return reply.status(201).send()
}