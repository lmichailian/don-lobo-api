'use strict'

const Validator = use('Validator')
const Database = use('Database')
const Customer = use('App/Model/Customer')

class CustomerController {
  /**
   * Get all customers.
   *
   * @param {*} request
   * @param {*} response
   */
  * index (request, response) {
    let customerCredit = []
    let index = 0
    const customers = yield Customer.all()

    for (let customer of customers) {
      const credits = yield customer.creditsTotal()
      customerCredit[index] = customer.toJSON()
      customerCredit[index].credits = credits[0].credits
      index++
    }

    yield response.status(200).json({ error: false, customers: customerCredit })
  }

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
      response.status(422).json({ error: true, message: validation.messages() })
      return
    }

    try {
      const customer = new Customer(body)
      yield customer.save()
      yield response.status(201).json({ error: false, customer: customer })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  /**
   * Update data customer.
   *
   * @param {*} request
   * @param {*} response
   */
  * update (request, response) {
    const body = request.all()

    try {
      const customer = yield Customer.findBy('id', request.param('id'))

      if (!customer) {
        yield response.status(404).json({ error: true, message: 'El recurso que quiere actualizar no existe' })
      }

      const customerId = request.param('id')
      const rules = Customer.updateRules(customerId)

      const validation = yield Validator.validate(body, rules, Customer.messages)

      if (validation.fails()) {
        response.status(422).json({ error: true, message: validation.messages() })
        return
      }

      customer.full_name = body.full_name
      customer.phone = body.phone
      customer.birthday = body.birthday

      if (body.card) {
        customer.card = body.card
      }

      yield customer.save()
      yield response.status(200).json({ error: false, customer: customer })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  /**
   * Delete customer.
   *
   * @param {*} request
   * @param {*} response
   */
  * delete (request, response) {
    try {
      const customer = yield Customer.findBy('id', request.param('id'))

      if (!customer) {
        yield response.status(404).json({ error: true, message: 'El recurso que quiere eliminar no existe' })
      }

      yield customer.delete()
      yield response.status(200).json({ error: false, message: 'El recurso se eliminó con exito' })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = CustomerController
