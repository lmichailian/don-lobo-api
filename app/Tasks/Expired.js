'use strict'

class Expired {
  /**
   *  This is required. This is the schedule for which the task will run.
   *  More docs here: https://github.com/node-schedule/node-schedule#cron-style-scheduling
   */
  static get schedule () {
    // At minute 20 past every 6th hour.
    return '20 */6 * * *'
  }

  /**
   * This is the function that is called at the defined schedule
   */
  * handle () {
    console.log('Se ejecuta el cron job')
    const Database = use('Database')
    const Credit = use('App/Model/Credit')
    const Charge = use('App/Services/Charge')

    try {
      const credits = yield Database.schema.raw('SELECT * FROM credits WHERE (expired = 0) AND created_at < date_sub(now(), interval 1 month)')

      if (credits[0].length !== 0) {
        for (let credit of credits[0]) {
          const creditObj = yield Credit.find(credit.id)
          creditObj.expired = 1
          yield creditObj.save()
          const customer = yield creditObj.customer().fetch()
          yield Charge.transaction(-creditObj.amount, 'Vencimiento de saldo', customer)
        }
      }
      console.log('Se terminó el proceso de vencimiento de créditos con éxito')
    } catch (e) {
      console.log(`Error en el proceso de vencimiento de crédito:${e.message}`)
    }
  }
}

module.exports = Expired
