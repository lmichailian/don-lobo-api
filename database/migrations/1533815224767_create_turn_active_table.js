'use strict'

const Schema = use('Schema')

class TurnActiveTableSchema extends Schema {
  up () {
    this.create('turn_active', (table) => {
      table.increments()

      table.datetime('start_at')
      table.datetime('end_at')
      table.boolean('status').default(0)

      table.timestamps()
    })
  }

  down () {
    this.drop('turn_active')
  }
}

module.exports = TurnActiveTableSchema
