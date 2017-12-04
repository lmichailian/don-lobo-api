'use strict'

const Schema = use('Schema')

class TransactionsTableSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.string('type')
      table.decimal('amount')
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.integer('service_id').unsigned().references('id').inTable('services')
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionsTableSchema
