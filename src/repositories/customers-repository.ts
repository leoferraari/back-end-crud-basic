import { Prisma, Customers } from "@prisma/client";

export interface CustomersRepository {
    create(data: Prisma.CustomersCreateInput): Promise<Customers>
    findByEmail(email: string): Promise<Customers | null>
    getAllCustomers(): Promise<Customers[]> 
    delete(id: string): Promise<null>
}