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
      const customer = yield Customer.findBy('card', request.input('card'))
      const service = yield Service.findBy('id', request.input('service'))

      if (!customer) {
        yield response.status(404).json({ error: true, message: 'El cliente no se encuentra con el número de tarjeta' })
      }

      if (!service) {
        yield response.status(404).json({ error: true, message: 'El servicio solicitado no existe' })
      }

      const credits = yield customer.credits().fetch()

      if (credits.toJSON().length === 0) {
        yield response.status(500).json({ error: true, message: 'No se posee saldo disponible, realice una recarga' })
      }

      const isSucces = yield Charge.deductService(service, credits.toJSON())

      if (!isSucces.success) {
        yield response.status(500).json({ error: true, message: 'No se pudo cobrar el servicio, por falta de crédito' })
      }

      yield Charge.transaction(-service.cost, service.service, customer, service)

      yield response.status(200).json({ error: false, message: 'El servicio se cobró' })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = ServiceController
