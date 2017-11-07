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

  /**
   * rule's message
   */
  static get messages () {
    return {
      'username.required' : 'El email es un campo requerido',
      'password.required' : 'El password es un campo requerido'
    }
  }

 

}

module.exports = User
