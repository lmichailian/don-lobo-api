'use strict'

const Schema = use('Schema')

class ScheduleTableSchema extends Schema {
  up () {
    this.table('schedule', (table) => {
      table.integer('range_id')
        .unsigned()
        .references('id')
        .inTable('working_range')
        .onDelete('cascade')
    })
  }

  down () {
    this.table('schedule', (table) => {
      table.dropColumn('range_id')
    })
  }
}

module.exports = ScheduleTableSchema
