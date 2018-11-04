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

    this.addHook('beforeUpdate', function * (next) {
      if (this.password) {
        this.password = yield Hash.make(this.password)
      }
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
      username: 'required|unique:users,username',
      password: 'required',
      email: 'email|required|unique:users,email'
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
      'username.required': 'El usuario es un campo requerido',
      'password.required': 'La contraseña es un campo requerido',
      'email.required': 'El email es un campo requerido',
      'username.unique': 'El usuario ya fue tomado, por favor ingrese uno distinto',
      'email.unique': 'El email ya fue tomado, por favor ingrese uno distinto'
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
