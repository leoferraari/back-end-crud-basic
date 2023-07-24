import { CustomersRepository } from '@/repositories/customers-repository'
import { Customers } from '@prisma/client'

interface ListCustomerUseCaseRequest {
    allCustomers: Customers[]
}

export class ListCustomersCase {

    constructor(private costumersRepository: CustomersRepository) {}
    
    async execute(): Promise<ListCustomerUseCaseRequest> {
     
        const allCustomers = await this.costumersRepository.getAllCustomers()

        return { 
            allCustomers,
        }
    }
}