'use strict'

const Lucid = use('Lucid')

class Claim extends Lucid {
  static get createRules () {
    return {
      stars: 'required',
      customer_id: 'required',
      comment: 'required',
      schedule_id: 'required'
    }
  }

  static get messages () {
    return {
      'starts.required': 'La calificación es requerida',
      'customer_id.required': 'El cliente es requerido',
      'comment.required': 'El comentario es requerido',
      'schedule_id.required': 'El turno es requerido'
    }
  }

  customer () {
    return this.belongsTo('App/Model/Customer')
  }

  schedule () {
    return this.belongsTo('App/Model/Schedule')
  }
}

module.exports = Claim
