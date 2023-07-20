import { prisma } from "@/lib/prisma"
import { Prisma, Customers } from "@prisma/client"
import { CustomersRepository } from "../customers-repository"

export default class PrismaCustomersRepository implements CustomersRepository {
    
    async create(data: Prisma.CustomersCreateInput) {
        const customer = await prisma.customers.create({
            data,
        })

        return customer
    }

    async findByEmail(email: string): Promise<Customers | null> {
        const user = await prisma.customers.findUnique({
            where: {
                email,
            },
        })

        return user
    }
}