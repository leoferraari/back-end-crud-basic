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

    async getAllCustomers(): Promise<Customers[]> {
        const allCustomers = await prisma.customers.findMany({})

        return allCustomers
    }

    async delete(id: string): Promise<null> {
        await prisma.customers.delete({
            where: {
                id
            }
        })
        return null
    }
}