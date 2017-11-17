'use strict'

const Database = use('Database')
const Transaction = use('App/Model/Transaction')

const Charge = exports = module.exports = {}

// si gasta = 500 descuento de 10%
// si gasta = 1000 descuento de 15%

/**
 * Deduct const a service.
 *
 * @param {*} service
 * @param {*} credits
 */
Charge.deductService = function * (service, credits) {
  const index = 0
  const first = credits[index]

  try {
    const discount = service.cost === 500 ? 0.1 : service.cost === 1000 ? 0.15 : null

    if (discount) {
      service.cost = service.cost - (service.cost * discount)
    }

    if ((service.cost > first.amount)) {
      const negative = first.amount - service.cost
      first.amount = first.amount - first.amount
      credits[index + 1].amount += negative

      yield this.deduct(first.amount, first.id)
      yield this.deduct(credits[index + 1].amount, credits[index + 1].id)

      return { success: true }
    }

    first.amount = first.amount - service.cost

    yield this.deduct(first.amount, first.id)

    return { success: true }
  } catch (e) {
    return { success: false }
  }
}

/**
 * Update credit customer.
 *
 * @param {*} amount
 * @param {*} idCredit
 */
Charge.deduct = function * (amount, idCredit) {
  yield Database
        .table('credits')
        .where('id', idCredit)
        .update('amount', amount)
}

/**
 * Create a Transaction.
 *
 * @param {*} amount
 * @param {*} type
 * @param {*} customer
 * @param {*} service
 */
Charge.transaction = function * (amount, type, customer = null, service = null) {
  yield Transaction.create({
    'type': type,
    'amount': amount,
    'customer_id': customer ? customer.id : null,
    'service_id': service ? service.id : null
  })
}
