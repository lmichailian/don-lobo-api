'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.boolean('status').default(1)
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('users')
    })
  }
}

module.exports = UsersTableSchema
