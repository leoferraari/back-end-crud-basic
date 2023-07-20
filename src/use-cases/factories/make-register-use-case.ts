import PrismaCustomersRepository from "@/repositories/prisma/prisma-customers-repository"
import { RegisterCustomerCase } from "../register"

export function makeRegisterUseCase() {
    const usersRepository = new PrismaCustomersRepository()
    const registerUseCase = new RegisterCustomerCase(
        usersRepository
    )

    return registerUseCase

}