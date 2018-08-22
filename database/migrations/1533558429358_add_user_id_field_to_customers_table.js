'use strict'

const Schema = use('Schema')

class CustomersTableSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      table.integer('user_id').nullable()
    })
  }

  down () {
    this.table('customers', (table) => {
      table.dropColumn('user_id')
    })
  }
}

module.exports = CustomersTableSchema
