import PrismaCustomersRepository from "@/repositories/prisma/prisma-customers-repository"
import { ListCustomersCase } from "../list-customers"

export function makeListCustomersUseCase() {
    const customersRepository = new PrismaCustomersRepository()
    const listCustomersUseCase = new ListCustomersCase(
        customersRepository
    )

    return listCustomersUseCase

}