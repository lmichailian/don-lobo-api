'use strict'

const Schema = use('Schema')

class CustomersTableSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      table.boolean('status').default(1).nullable()
      table.string('image').nullable()
    })
  }

  down () {
    this.table('customers', (table) => {
      table.dropColumn('status')
      table.dropColumn('image')
    })
  }
}

module.exports = CustomersTableSchema
