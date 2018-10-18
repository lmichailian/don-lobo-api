'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {
   /**
     * fields to hide when fetch rows
     *
     * @return {Array}
     */
  static get hidden () {
    return ['password']
  }

  /**
   * fields to hide when fetch rows
   *
   * @return {Array}
   */
  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  /**
   * rules for login
   */
  static get loginRules () {
    return {
      username: 'required',
      password: 'required'
    }
  }

  static get createRules () {
    return {
      username: 'required',
      password: 'required',
      email: 'email|required'
    }
  }

  /**
  * rules for login
  */
  static updateRules (userId) {
    return {
      username: `required|unique:users,username,id,${userId}`,
      password: 'required',
      email: `required|email|unique:users,email,id,${userId}`
    }
  }

  /**
   * rule's message
   */
  static get messages () {
    return {
      'username.required': 'El username es un campo requerido',
      'password.required': 'El password es un campo requerido',
      'email.required': 'El email es un campo requerido'
    }
  }

  customer () {
    return this.hasOne('App/Model/Customer')
  }

  roles () {
    return this.belongsToMany('App/Model/Rol', 'rol_user')
  }

  ranges () {
    return this.hasMany('App/Model/WorkingRanges')
  }
}

module.exports = User
