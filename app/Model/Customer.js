'use strict'

const Lucid = use('Lucid')
const Database = use('Database')
const Env = use('Env')

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
   * Transaction customer by id.
   */
  transactions (id) {
    return this.hasMany('App/Model/Transaction')
    .where('customer_id', id)
    .orderBy('created_at', 'DESC')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

  /**
   * Sum Credits for customer.
   */
  * creditsTotal () {
    return yield Database.from('credits').sum('amount as credits')
      .where('expired', false)
      .where('customer_id', this.id)
  }

  getImage (image) {
    if (!image) {
      return `${Env.get('BASE_URL')}/profile/default.png`
    }

    return `${Env.get('BASE_URL')}${image}`
  }

  /**
  * rules for login
  */
  static get createRules () {
    return {
      full_name: 'required',
      email: 'unique:customers',
      card: 'unique:customers'
    }
  }

  /**
  * rules for login
  */
  static updateRules (customerId) {
    return {
      full_name: 'required',
      phone: 'required',
      birthday: 'date',
      email: `unique:customers,email,id,${customerId}`,
      card: `unique:customers,card,id,${customerId}`
    }
  }

  /**
   * rule's message
   */
  static get messages () {
    return {
      'full_name.required': 'El nombre completo es un campo requerido',
      'phone.required': 'El télefono es un campo requerido',
      'card.required': 'El numero de tarjeta es requerido',
      'birthday.required': 'El campo cumpleaños es requerido',
      'card.unique': 'El número de tarjeta ya existe'
    }
  }
}

module.exports = Customer
