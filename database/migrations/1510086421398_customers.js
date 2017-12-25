'use strict'

const Schema = use('Schema')

class CustomersTableSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('email')
      table.string('full_name')
      table.string('phone')
      table.bigInteger('card').unique()
      table.index('card')
      table.datetime('birthday')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersTableSchema
