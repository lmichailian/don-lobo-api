'use strict'

const Schema = use('Schema')

class ScheduleTableSchema extends Schema {
  up () {
    this.create('schedule', (table) => {
      table.increments()

      table.datetime('start_at')
      table.datetime('end_at')
      table.integer('service_id').unsigned().references('id').inTable('services').onDelete('cascade')
      table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('cascade')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.boolean('status').default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('schedule')
  }
}

module.exports = ScheduleTableSchema
