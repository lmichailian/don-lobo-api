'use strict'

const Lucid = use('Lucid')

class Customer extends Lucid {

  /**
   * Credits for custommer.
   */
  credits () {
    return this.hasMany('App/Model/Credit')
    .where('expired', false)
    .where('amount', '>', 0)
    .orderBy('created_at', 'ASC')
  }

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
      card: 'required|unique:customers'
    }
}

/**
* rules for login
*/
  static updateRules (customerId) {
    return {
      full_name: 'required',
      phone: 'required',
      card: `unique:customers,card,id,${customerId}`,
    }
  }

/**
 * rule's message
 */
static get messages () {
  return {
    'full_name.required' : 'El nombre completo es un campo requerido',
    'phone.required' : 'El télefono es un campo requerido',
    'card.required' : 'El numero de tarjeta es requerido',
    'card.unique'   : 'El número de tarjeta ya existe'
  }
}

}

module.exports = Customer
