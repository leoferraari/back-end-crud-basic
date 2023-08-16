import { CustomersRepository } from '@/repositories/customers-repository'

export class DeleteCustomersCase {
    constructor(private costumersRepository: CustomersRepository) {}
    
    async execute(id: string): Promise<null> {
        await this.costumersRepository.delete(id)
        return null
    }
}