import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateCustomersUseCase } from '@/use-cases/factories/make-update-customers-use-case'

export async function updateCustomers (request: FastifyRequest, reply: FastifyReply) {
    const { customerId } = request.params;

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        telephone: z.string().min(11),
    })

    const { name, email, telephone } = registerBodySchema.parse(request.body)

    try {
        const updateUseCase = makeUpdateCustomersUseCase()

        const customers = await updateUseCase.execute(customerId, {name, email, telephone})

        return reply.status(200).send({
            customers
        })
    } catch(err) {
        return reply.status(500).send()
    }
}