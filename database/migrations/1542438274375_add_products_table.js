'use strict'

const Schema = use('Schema')

class ProductsTableSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.string('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsTableSchema
