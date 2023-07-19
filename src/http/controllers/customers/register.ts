import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        telephone: z.string().min(11),
    })

    const { name, email, telephone } = registerBodySchema.parse(request.body)
}