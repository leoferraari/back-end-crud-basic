import { FastifyInstance } from "fastify";
import { register } from "./register";
import { listCustomers } from "./list-customers";
import { deleteCustomers } from "./delete-customers";
import { updateCustomers } from "./update-customers";

export async function customersRoutes(app: FastifyInstance) {
    app.post('/customers', register)
    app.get('/customers', listCustomers)
    app.delete('/customers/:customerId?', deleteCustomers)
    app.put('/customers/:customerId?',updateCustomers)
}
