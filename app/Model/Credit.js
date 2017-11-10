'use strict'

const Lucid = use('Lucid')

class Credit extends Lucid {

 /**
 * rules for login
 */
  static get createRules () {
    return {
      card: 'required',
      amount:"required|regex:^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$",
    }
}

/**
 * rule's message
 */
static get messages () {
  return {
    'card.required' : 'El número de tarjeta debe ser requerido',
    'amount.required' : 'El monto de recarga es un campo requerido',
    'amount.regex' : 'El monto de recarga es un valor numérico'
  }
}

}

module.exports = Credit
