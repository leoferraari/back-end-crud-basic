import PrismaCustomersRepository from "@/repositories/prisma/prisma-customers-repository"
import { ListCustomersCase } from "../list-customers"

export function makeListCustomersUseCase() {
    const usersRepository = new PrismaCustomersRepository()
    const listCustomersUseCase = new ListCustomersCase(
        usersRepository
    )

    return listCustomersUseCase

}