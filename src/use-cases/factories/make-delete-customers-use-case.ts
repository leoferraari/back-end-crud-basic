import PrismaCustomersRepository from "@/repositories/prisma/prisma-customers-repository"
import { DeleteCustomersCase } from "../delete-customers"

export function makeDeleteCustomersUseCase() {
    const customersRepository = new PrismaCustomersRepository()
    const deleteCustomersUseCase = new DeleteCustomersCase(
        customersRepository
    )

    return deleteCustomersUseCase

}