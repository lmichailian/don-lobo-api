'use strict'

const Claim = use('App/Model/Claim')
const Validator = use('Validator')

class ClaimsController {
  * index (request, response) {
    const claims = yield Claim.query().with(['customer', 'schedule', 'schedule.barber']).fetch()
    yield response.status(200).json({ error: false, claims })
  }

  * store (request, response) {
    const body = request.all()
    const validation = yield Validator.validate(request.all(), Claim.createRules, Claim.messages)

    if (validation.fails()) {
      response.status(422).json({ error: true, message: validation.messages() })
      return
    }

    try {
      const claim = new Claim(body)
      yield claim.save()
      yield response.status(200).json({ error: false, claim })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = ClaimsController
