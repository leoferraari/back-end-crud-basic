import { CustomersRepository } from '@/repositories/customers-repository'
import { CustomersAlreadyExistsError } from './errors/customers-already-exists-error'
import { Customers } from '@prisma/client'

interface RegisterCustomerUseCaseRequest {
    name: string
    email: string
    telephone: string
}

interface RegisterUseCaseResponse {
    customer: Customers
}

export class RegisterCustomerCase {

    constructor(private costumersRepository: CustomersRepository) {}
    
    async execute({    name,    email,  telephone, }: RegisterCustomerUseCaseRequest): Promise<RegisterUseCaseResponse> {
     
        const userWithSameEmail = await this.costumersRepository.findByEmail(email)
    
        if (userWithSameEmail) {
            throw new CustomersAlreadyExistsError()
        }

        const customer = await this.costumersRepository.create({
            name,
            email,
            telephone,
        })

        return { 
            customer,
        }
    }
}