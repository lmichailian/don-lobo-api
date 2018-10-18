'use strict'

const Rol = use('App/Model/Rol')
const User = use('App/Model/User')
const Validator = use('Validator')

class BarbersController {
  * index (request, response) {
    let barbers = yield Rol.query().with('barbers').where('id', 3).fetch()

    barbers = barbers.toJSON()[0].barbers

    return yield response.status(200).json({ error: false, barbers })
  }
}

module.exports = BarbersController
