import { FastifyInstance } from "fastify";
import { register } from "./register";
import { listCustomers } from "./list-customers";

export async function customersRoutes(app: FastifyInstance) {
    app.post('/customers', register)
    app.post('/customers', listCustomers)
}
