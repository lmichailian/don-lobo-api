'use strict'

const Schema = use('Schema')

class ScheduleTableSchema extends Schema {
  up () {
    this.table('schedule', (table) => {
      table.boolean('is_cancel').default(0)
    })
  }

  down () {
    this.table('schedule', (table) => {
      table.dropColumn('is_cancel')
    })
  }
}

module.exports = ScheduleTableSchema
