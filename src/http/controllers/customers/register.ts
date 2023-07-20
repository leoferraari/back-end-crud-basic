import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CustomersAlreadyExistsError } from '@/use-cases/errors/customers-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        telephone: z.string().min(11),
    })

    const { name, email, telephone } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            telephone
        })
    } catch(err) {
        if (err instanceof CustomersAlreadyExistsError) {
            return reply.status(409).send({ message: err.message})
        }

        return reply.status(500).send()
    }

    return reply.status(201).send()
}