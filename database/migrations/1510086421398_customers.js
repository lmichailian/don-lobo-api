'use strict'

const Schema = use('Schema')

class CustomersTableSchema extends Schema {

  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('full_name')
      table.string('phone')
      table.integer('card','255')
      table.index('card')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('customers')
  }

}

module.exports = CustomersTableSchema
