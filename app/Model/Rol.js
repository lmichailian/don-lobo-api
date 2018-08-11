'use strict'

const Lucid = use('Lucid')

class Rol extends Lucid {
  static get table () {
    return 'roles'
  }
}

module.exports = Rol
