'use strict'

const Schema = use('Schema')

class BranchesTableSchema extends Schema {
  up () {
    this.create('branches', (table) => {
      table.increments()

      table.string('address')
      table.string('name')

      table.timestamps()
    })
  }

  down () {
    this.drop('branches')
  }
}

module.exports = BranchesTableSchema
