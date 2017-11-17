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
    const customers = yield Database.select('customers.id', 'customers.full_name', 'customers.phone', 'customers.card')
            .from('customers').sum('credits.amount as credits')
            .innerJoin('credits', 'customers.id', 'credits.customer_id')
            .whereNull('customers.deleted_at')
            .where('credits.expired', false)

    yield response.status(200).json({ error: false, customers: customers })
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
      const customer = yield Customer.findByOrFail('id', request.param('id'))

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
      const customer = yield Customer.findByOrFail('id', request.param('id'))
      yield customer.delete()
      yield response.status(200).json({ error: false, message: 'Delete custommer is successfully' })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = CustomerController
