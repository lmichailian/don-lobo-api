'use strict'

const Schema = use('Schema')

class WorkingRangeTableSchema extends Schema {
  up () {
    this.create('working_range', (table) => {
      table.increments()

      table.time('start_at')
      table.time('end_at')
      table.string('days')
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('working_range')
  }
}

module.exports = WorkingRangeTableSchema
