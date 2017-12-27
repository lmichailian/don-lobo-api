'use strict'

const Validator = use('Validator')
const Database = use('Database')
const Charge = use('App/Services/Charge')
const Customer = use('App/Model/Customer')
const Credit = use('App/Model/Credit')

class CreditController {
  /**
   * Show total credit for customer.
   *
   * @param {*} request
   * @param {*} response
   */
  * show(request, response) {
    const customer = yield Customer.findBy('card', request.param('card'))

    if (customer === null) {
      response.status(404).json({ error: true, message: 'El número de tarjeta brindado no existe' })
      return
    }

    try {
      const credit = yield Database.select(
        'customers.id', 'customers.email', 'customers.birthday',
        'customers.full_name', 'customers.phone'
      ).from('customers').sum('credits.amount as credits')
        .innerJoin('credits', 'customers.id', 'credits.customer_id')
        .where('credits.expired', false)
        .where('customers.card', request.param('card'))

      yield response.status(200).json({ error: false, credit: credit[0] })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  /**
   * Crate a credit for user.
   *
   * @param {*} request
   * @param {*} response
   */
  * store(request, response) {
    const validation = yield Validator.validate(request.all(), Credit.createRules, Credit.messages)

    if (validation.fails()) {
      response.status(422).json({ error: true, message: validation.messages() })
      return
    }

    try {
      const customer = yield Customer.findByOrFail('card', request.input('card'))
      const credit = new Credit({
        amount: request.input('amount'),
        customer_id: customer.id
      })
      yield Charge.transaction(credit.amount, 'Carga de saldo', customer)
      yield credit.save()
      yield response.status(201).json({ error: false, credit: credit })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = CreditController
