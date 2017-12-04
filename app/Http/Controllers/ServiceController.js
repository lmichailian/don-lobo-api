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
    var cost = 0
    const customer = yield Customer.findBy('card', request.input('card'))
    const totalCredit = yield customer.creditsTotal()
    const services = request.input('services')
    
    try {
      if (!customer) {
        yield response.status(404).json({ error: true, message: 'El cliente no se encuentra con el número de tarjeta' })
      }

      for (let service of services) {
        cost = cost + parseInt(service.amount)
      }

      if (cost > totalCredit[0].credits) {
        yield response.status(500).json({ error: true, message: 'No posee saldo suficiente saldo para realizar la compra de los servicios' })
      }

      let credits = yield customer.credits().fetch()

      if (credits.toJSON().length === 0) {
        yield response.status(500).json({ error: true, message: 'No se posee saldo disponible, realice una recarga' })
      }

      for (let service of services) {
        credits = yield customer.credits().fetch()
        const isSucces = yield Charge.deductService(service.amount, credits.toJSON())

        if (!isSucces.success) {
          yield response.status(500).json({ error: true, message: 'No se pudo cobrar el servicio, por falta de crédito' })
        }

        const serviceObj = yield Service.findBy('id', service.service)
        const nameService = serviceObj ? serviceObj.service : service.service

        yield Charge.transaction(-service.amount, nameService, customer, serviceObj)
        
      }

      yield response.status(200).json({ error: false, message: 'El servicio se cobró' })
      
      
    } catch (e) {
       yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = ServiceController
