'use strict'

const Validator = use('Validator')
const Customer = use('App/Model/Customer')
class CustomerController {

    /**
     * Create a customer.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    * store (request, response) {
        const body = request.all()

        const validation = yield Validator.validate(request.all(), Customer.createRules, Customer.messages)

        if (validation.fails()) {
            response.status(422).json({error: true, message: validation.messages()})
            return
        }

        try {
            const customer = new Customer(body)
            yield customer.save()
            yield response.status(201).json({error: false, customer: customer})
        } catch (e) {
            yield response.status(500).json({error: true, message: e.message})
        }
    }

}

module.exports = CustomerController
