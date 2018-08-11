'use strict'

const Schedule = use('App/Model/Schedule')
const Validator = use('Validator')
const moment = use('moment')

class ScheduleController {
  * index (request, response) {
    const userId = Object.keys(request.only('user_id')).length > 0 ? request.only('user_id') : null
    const startAt = Object.keys(request.only('start_at')).length > 0 ? request.only('start_at').start_at : null

    let schedule = Schedule.query().with(['customer', 'barber', 'service'])

    try {
      if (userId && !startAt) {
        schedule = schedule.where('user_id', userId)
      } else if (!userId && startAt) {
        schedule = schedule
        .where('start_at', '>=', startAt)
        .where('start_at', '<', `${moment(startAt).format('YYYY-MM-DD')} 23:59:59`)
      } else if (userId && startAt) {
        schedule = schedule.where('start_at', '>=', startAt)
        .where('start_at', '<', `${moment(startAt).format('YYYY-MM-DD')} 23:59:59`)
        .where('user_id', userId)
      }

      schedule = yield schedule.fetch()

      yield response.status(200).json({ error: false, schedule })
    } catch (e) {
      yield response.status(500).json({ error: false, message: e.message })
    }
  }

  * store (request, response) {
    const body = request.all()
    const validation = yield Validator.validate(request.all(), Schedule.rules, Schedule.messages)

    if (validation.fails()) {
      response.status(422).json({ error: true, message: validation.messages() })
      return
    }

    try {
      const schedule = new Schedule(body)
      yield schedule.save()
      yield response.status(200).json({ error: false, schedule })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  * update (request, response) {
    const body = request.all()
    const schedule = yield Schedule.findBy('id', request.param('id'))

    if (!schedule) {
      yield response.status(404).json({ error: true, message: 'El recurso que quiere actualizar no existe' })
    }

    try {
      const validation = yield Validator.validate(request.all(), Schedule.rules, Schedule.messages)

      if (validation.fails()) {
        response.status(422).json({ error: true, message: validation.messages() })
        return
      }

      schedule.start_at = body.start_at
      schedule.service_id = body.service_id
      schedule.user_id = body.user_id
      schedule.customer_id = body.customer_id

      yield schedule.save()
      yield response.status(200).json({ error: false, schedule })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  * delete (request, response) {
    try {
      const schedule = yield Schedule.findBy('id', request.param('id'))

      if (!schedule) {
        yield response.status(404).json({ error: true, message: 'El recurso que quiere eliminar no existe' })
      }

      yield schedule.delete()
      yield response.status(200).json({ error: false, message: 'El recurso se eliminó con exito' })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }

  * status (request, response) {
    const schedule = yield Schedule.findBy('id', request.param('id'))

    if (!schedule) {
      yield response.status(404).json({ error: true, message: 'El recurso que quiere actualizar no existe' })
    }

    try {
      schedule.status = !schedule.status
      yield schedule.save()
      yield response.status(200).json({ error: false, message: 'El estado se cambio con éxito', schedule })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = ScheduleController
