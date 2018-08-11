'use strict'

const Schema = use('Schema')

class BranchScheduleTableSchema extends Schema {
  up () {
    this.create('branch_schedule', (table) => {
      table.increments()

      table.integer('branch_id')
        .unsigned()
        .references('id')
        .inTable('branches')
        .onDelete('cascade')
      table.string('days')
      table.time('open_at')
      table.time('close_at')

      table.timestamps()
    })
  }

  down () {
    this.drop('branch_schedule')
  }
}

module.exports = BranchScheduleTableSchema
