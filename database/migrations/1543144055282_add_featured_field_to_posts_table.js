'use strict'

const Schema = use('Schema')

class PostsTableSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.boolean('featured').default(0)
    })
  }

  down () {
    this.table('posts', (table) => {
      table.dropColumn('featured')
    })
  }
}

module.exports = PostsTableSchema
