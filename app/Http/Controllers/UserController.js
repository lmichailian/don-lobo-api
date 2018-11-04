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

  /**
   * Get data user logged.
   *
   * @param {*} request
   * @param {*} response
   */
  * user (request, response) {
    try {
      const user = request.auth.user
      yield response.status(200).json({ error: false, user: user })
    } catch (e) {
      response.status(500).json({ error: true, message: e.message })
    }
  }

  * index (request, response) {
    const users = yield User.query().with('roles').fetch()
    yield response.status(200).json({ error: false, users })
  }

  * store (request, response) {
    const {username, password, email, rol_id, ranges} = request.all()
    const validation = yield Validator.validate(request.all(), User.createRules, User.messages)

    if (validation.fails()) {
      response.status(422).json({ error: true, message: validation.messages() })
      return
    }

    try {
      const user = new User({username, password, email})
      yield user.save()

      yield user.ranges().createMany(ranges)

      yield user.roles().attach(rol_id)

      yield response.status(200).json({ error: false, user })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  * update (request, response) {
    const {username, password, email, roles} = request.all()

    try {
      const user = yield User.findBy('id', request.param('id'))

      if (!user) {
        yield response.status(404).json({ error: true, message: 'El recurso que quiere actualizar no existe' })
      }

      const userId = request.param('id')
      const rules = User.updateRules(userId)

      const validation = yield Validator.validate(request.all(), rules, User.messages)

      if (validation.fails()) {
        response.status(422).json({ error: true, message: validation.messages() })
        return
      }

      user.username = username
      user.password = password
      user.email = email

      yield user.save()

      yield user.roles().sync(roles)

      yield response.status(200).json({ error: false, user: user })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  * status (request, response) {
    const user = yield User.findBy('id', request.param('id'))

    if (!user) {
      yield response.status(404).json({ error: true, message: 'El recurso que quiere actualizar no existe' })
    }

    try {
      user.status = !user.status
      yield user.save()
      yield response.status(200).json({ error: false, message: 'El estado se cambio con éxito', user })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  * delete (request, response) {
    try {
      const user = yield User.findBy('id', request.param('id'))

      if (!user) {
        yield response.status(404).json({ error: true, message: 'El recurso que quiere eliminar no existe' })
      }

      yield user.delete()
      yield response.status(200).json({ error: false, message: 'El recurso se eliminó con exito' })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = UserController
