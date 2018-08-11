'use strict'

const Lucid = use('Lucid')

class Schedule extends Lucid {
  static get table () {
    return 'schedule'
  }

  /**
  * rules for login
  */
  static get rules () {
    return {
      start_at: 'required',
      customer_id: 'required',
      user_id: 'required',
      service_id: 'required'
    }
  }

  static get messages () {
    return {
      'start_at.required': 'El nombre completo es un campo requerido',
      'start_at.date': 'No es una fecha valida',
      'customer_id.required': 'El cliente es un campo requerido',
      'user_id.required': 'El usuario es requerido',
      'service_id.required': 'El servicio es requerido'
    }
  }

  customer () {
    return this.belongsTo('App/Model/Customer')
  }

  barber () {
    return this.belongsTo('App/Model/User', 'id')
  }

  service () {
    return this.belongsTo('App/Model/Service')
  }
}

module.exports = Schedule
