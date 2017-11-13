'use strict'

const Validator = use('Validator')
const Charge = use('App/Services/Charge')
const Customer = use('App/Model/Customer')
const Service = use('App/Model/Service')
const Transaction = use('App/Model/Transaction')

class ServiceController {

    /**
     * Charge service choise.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    * store (request, response) {
        try {
            const customer = yield Customer.findByOrFail('card', request.input('card'))
            const service = yield Service.findByOrFail('id', request.input('service'))
    
            const credits = yield customer.credits().fetch()
    
            const isSucces =  yield Charge.deductService(service, credits.toJSON())
    
            if (!isSucces) {
                yield response.status(500).json({error: true, message: 'No se pudo cobrar el servicio'})
            }
    
            yield Charge.transaction(service.cost, service.service, customer, service)
    
            yield response.status(200).json({error: false, message: 'El servicio se cobró'})
        } catch (e) {
            yield response.status(500).json({error: true, message: e.message})
        }

    }

}

module.exports = ServiceController
