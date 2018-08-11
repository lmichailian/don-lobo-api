'use strict'

const Schema = use('Schema')

class PostImagesTableSchema extends Schema {
  up () {
    this.create('post_images', (table) => {
      table.increments()

      table.integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .onDelete('cascade')
      table.string('name')
      table.string('path')

      table.timestamps()
    })
  }

  down () {
    this.drop('post_images')
  }
}

module.exports = PostImagesTableSchema
