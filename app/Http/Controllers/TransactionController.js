'use strict'

const Database = use('Database')
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
    let totalTransaction = []
    const transactions = yield Transaction
            .with('customer', 'service')
            .where('customer_id', request.param('id'))
            .orderBy('created_at', 'DESC')
            .fetch()

    const total = yield Database.from('transactions')
                      .sum('amount as total')
                      .where('customer_id', request.param('id'))
    
    totalTransaction[0] = transactions.toJSON()
    totalTransaction[1] = total[0]

    yield response.status(200).json({ error: false, transactions: totalTransaction })
  }
}

module.exports = TransactionController
