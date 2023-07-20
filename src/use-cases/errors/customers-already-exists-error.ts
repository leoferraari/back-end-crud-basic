export class CustomersAlreadyExistsError extends Error {
    constructor() {
        super('A customer with that email already exists.')
    }
    
}