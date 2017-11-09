'use strict'

const Schema = use('Schema')

class CreditsTableSchema extends Schema {

  up () {
    this.create('credits', (table) => {
      table.increments()
      table.decimal('amount')
      table.boolean('expired').default(false)
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.timestamps()
    })
  }

  down () {
    this.drop('credits')
  }

}

module.exports = CreditsTableSchema
