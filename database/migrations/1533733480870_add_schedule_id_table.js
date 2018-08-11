'use strict'

const Schema = use('Schema')

class ClaimsTableSchema extends Schema {
  up () {
    this.table('claims', (table) => {
      table.integer('schedule_id').unsigned().references('id').inTable('schedule').onDelete('cascade')
    })
  }

  down () {
    this.table('claims', (table) => {
      table.dropColumn('schedule_id')
    })
  }
}

module.exports = ClaimsTableSchema
