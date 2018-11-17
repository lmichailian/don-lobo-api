'use strict'

const Lucid = use('Lucid')

class Product extends Lucid {
  static get createRules () {
    return {
      name: 'required',
      description: 'required',
      price: 'required'
    }
  }

  static get messages () {
    return {
      'name.required': 'El nombre es requerido',
      'description.required': 'La descripción es requerida',
      'price.required': 'El precio  es requerido'
    }
  }

  images () {
    return this.hasMany('App/Model/ProductImage')
  }
}

module.exports = Product
