'use strict'

const Lucid = use('Lucid')
const Database = use('Database')

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
   * Sum Credits for custommer.
   */
  * creditsTotal() {
   return  yield Database.from('credits').sum('amount as credits')
                .where('expired', false)
                .where('customer_id', this.id)
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
