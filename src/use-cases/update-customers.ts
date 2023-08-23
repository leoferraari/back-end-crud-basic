import { CustomersRepository } from '@/repositories/customers-repository'
import { CustomersAlreadyExistsError } from './errors/customers-already-exists-error'
import { Customers } from '@prisma/client'

interface UpdateCustomerUseCaseRequest {
    name: string
    email: string
    telephone: string
}

interface UpdateUseCaseResponse {
    customer: Customers
}

export class UpdateCustomersCase {
    constructor(private costumersRepository: CustomersRepository) {}
    
    async execute(id: string, { name, email, telephone }: UpdateCustomerUseCaseRequest): Promise<UpdateUseCaseResponse> {

        const userWithSameEmail = await this.costumersRepository.findByEmailUpdate(email, id)
    
        if (userWithSameEmail) {
            throw new CustomersAlreadyExistsError()
        }

        const customer = await this.costumersRepository.update(id, {
            name,
            email,
            telephone,
        })

        return { 
            customer,
        }
    }
}