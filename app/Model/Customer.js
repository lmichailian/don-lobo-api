'use strict'

const Lucid = use('Lucid')

class Customer extends Lucid {

  /**
   * Return delete timestamp
   */
  static get deleteTimestamp () {
    return 'deleted_at'
  }


/**
* rules for login
*/
  static get createRules () {
    return {
      full_name: 'required',
      phone: 'required',
      card: 'required'
    }
}

/**
 * rule's message
 */
static get messages () {
  return {
    'full_name.required' : 'El nombre completo es un campo requerido',
    'phone.required' : 'El télefono es un campo requerido',
    'card.required' : 'El numero de tarjeta es requerido'
  }
}

}

module.exports = Customer
