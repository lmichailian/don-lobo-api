'use strict'

const Schema = use('Schema')

class RolUserTableSchema extends Schema {
  up () {
    this.create('rol_user', (table) => {
      table.increments()

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('rol_id').unsigned().references('id').inTable('roles').onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('rol_user')
  }
}

module.exports = RolUserTableSchema
