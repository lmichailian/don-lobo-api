'use strict'

const Schema = use('Schema')

class CustomersTableSchema extends Schema {

  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('full_name')
      table.string('phone')
      table.string('card')
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }

}

module.exports = CustomersTableSchema
