'use strict'

const Schema = use('Schema')

class TransactionsTableSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.string('type')
      table.decimal('amount')
      table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('cascade')
      table.integer('service_id').unsigned().references('id').inTable('services').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionsTableSchema
