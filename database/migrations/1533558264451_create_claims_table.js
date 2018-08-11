'use strict'

const Schema = use('Schema')

class ClaimsTableSchema extends Schema {
  up () {
    this.create('claims', (table) => {
      table.increments()

      table.double('stars')
      table.integer('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onDelete('cascade')
      table.string('comment')

      table.timestamps()
    })
  }

  down () {
    this.drop('claims')
  }
}

module.exports = ClaimsTableSchema
