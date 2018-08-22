'use strict'

const Lucid = use('Lucid')

class Rol extends Lucid {
  static get table () {
    return 'roles'
  }

  barbers () {
    return this.belongsToMany('App/Model/User', 'rol_user')
  }
}

module.exports = Rol
