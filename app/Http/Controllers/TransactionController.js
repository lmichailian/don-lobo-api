'use strict'

const Transaction = use('App/Model/Transaction')

class TransactionController {
    /**
     * List all transactions
     *
     * @param {*} request
     * @param {*} response
     */
  * index (request, response) {
    const transactions = yield Transaction.query()
            .with('customer', 'service')
            .fetch()

    yield response.status(200).json({ error: false, transactions: transactions })
  }

    /**
     * Get transactions by customer id.
     *
     * @param {*} request
     * @param {*} response
     */
  * show (request, response) {
    const transactions = yield Transaction
            .with('customer', 'service')
            .where('customer_id', request.param('id'))
            .fetch()

    yield response.status(200).json({ error: false, transactions: transactions })
  }
}

module.exports = TransactionController
