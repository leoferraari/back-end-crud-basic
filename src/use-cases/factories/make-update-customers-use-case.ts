import PrismaCustomersRepository from "@/repositories/prisma/prisma-customers-repository"
import { UpdateCustomersCase } from "../update-customers"

export function makeUpdateCustomersUseCase() {
    const customersRepository = new PrismaCustomersRepository()
    const updateCustomersUseCase = new UpdateCustomersCase(
        customersRepository
    )

    return updateCustomersUseCase

}