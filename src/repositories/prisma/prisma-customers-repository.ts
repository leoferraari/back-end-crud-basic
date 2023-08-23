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
        const customer = await prisma.customers.findUnique({
            where: {
                email,
            },
        })

        return customer
    }

    async findByEmailUpdate(email: string, id: string): Promise<Customers | null> {
        const customer = await prisma.customers.findUnique({
            where: {
                email,
                NOT: {
                    id
                },
            },
        })

        return customer
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

    async update(id: string, data: Prisma.CustomersUpdateInput) {
        const customer = await prisma.customers.update({
            where: {
                id
            },
            data
        })

        return customer
    }
}