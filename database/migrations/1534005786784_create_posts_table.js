'use strict'

const Schema = use('Schema')

class PostsTableSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()

      table.string('title')
      table.string('body')
      table.time('time').nullable()
      table.string('location').nullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsTableSchema
