'use strict'

const Schema = use('Schema')

class ServicesTableSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('service')
      table.decimal('cost')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServicesTableSchema
