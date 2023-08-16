import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteCustomersUseCase } from '@/use-cases/factories/make-delete-customers-use-case'

export async function deleteCustomers (request: FastifyRequest, reply: FastifyReply) {
    const { customerId } = request.params;

    try {
        const deleteUseCase = makeDeleteCustomersUseCase()

        console.log(customerId)
        const customers = await deleteUseCase.execute(customerId)

        return reply.status(200).send({
            customers
        })
    } catch(err) {
        return reply.status(500).send()
    }
}