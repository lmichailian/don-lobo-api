'use strict'

const Schema = use('Schema')

class ProductImagesTableSchema extends Schema {
  up () {
    this.create('product_images', (table) => {
      table.increments()

      table.integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onDelete('cascade')
      table.string('name')
      table.string('path')

      table.timestamps()
    })
  }

  down () {
    this.drop('product_images')
  }
}

module.exports = ProductImagesTableSchema
