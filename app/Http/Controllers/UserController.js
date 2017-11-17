'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')

class UserController {
    /**
     * Login user.
     *
     * @param {*} request
     * @param {*} response
     */
  * login (request, response) {
    const validation = yield Validator.validate(request.all(), User.loginRules, User.messages)

    if (validation.fails()) {
      response.status(422).json({ error: true, message: validation.messages() })
      return
    }

    const uid = request.input('username')
    const password = request.input('password')

    try {
      const token = yield request.auth.attempt(uid, password)
      yield response.status(200).json({ error: false, token: token })
    } catch (e) {
      response.status(401).json({ error: true, message: 'username or password are not defined' })
    }
  }
}

module.exports = UserController
