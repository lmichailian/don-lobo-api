'use strict'

const Schedule = use('App/Model/Schedule')
const scheduleSrv = use('App/Services/Schedule')
const Branch = use('App/Model/Branch')
const moment = use('moment')
const Validator = use('Validator')
const _ = use('lodash')

class ScheduleController {
  * today (request, response) {
    const schedules = yield Schedule.query().with('barber', 'customer', 'service').fetch()
    const startAt = request.all().start_at

    const dateSchedules = schedules.toJSON().filter((el) => {
      return moment(el.start_at).format('YYYY-MM-DD') >= `${startAt}` &&
        moment(el.start_at).format('YYYY-MM-DD') <= `${startAt}`
    })

    yield response.status(200).json({ error: true, dateSchedules })
  }

  * index (request, response) {
    const userId = Object.keys(request.only('user_id')).length > 0 ? request.only('user_id') : null
    const startAt = Object.keys(request.only('start_at')).length > 0 ? request.only('start_at').start_at : null
    const service = Object.keys(request.only('service')).length > 0 ? request.only('service').service : null

    if (!startAt) return yield response.status(422).json({ error: true, message: 'Date is required' })

    try {
      if (!userId) {
        const branch = yield Branch.query().with('branchSchedule').fetch()
        const isWeekend = yield scheduleSrv.isWeekend()
        const schedule = yield scheduleSrv.getTodayServices(startAt, service)

        let timeRanges = yield branch.toJSON()[0].branchSchedule
        .map(function * ({days, open_at, close_at}) {
          return {
            days,
            hours: yield scheduleSrv.getAvailableTime(`${startAt} ${open_at}`, `${startAt} ${close_at}`, schedule)
          }
        })

        if (!isWeekend) {
          timeRanges = timeRanges.filter(el => el.days !== 'weekend_morning')
        } else {
          timeRanges = timeRanges.filter(el => el.days === 'weekend_morning')
        }

        yield response.status(200).json({ error: false, timeRanges })
      }

      const schedule = Schedule.query().with(['customer', 'barber', 'service']).fetch()

      yield response.status(200).json({ error: false, schedule })
    } catch (e) {
      yield response.status(500).json({ error: false, message: e.message })
    }
  }

  * store (request, response) {
    const body = request.except('availables')
    const availables = request.only('availables')
    const validation = yield Validator.validate(request.all(), Schedule.rules, Schedule.messages)

    if (body.user_id === 'na') {
      body.user_id = availables.availables[_.random(0, availables.length - 1)]
    }

    const existTurn = yield Schedule.query()
      .where('start_at', body.start_at)
      .where('customer_id', body.customer_id)
      .fetch()

    if (existTurn.toJSON().length > 0) {
      yield response.status(422).json({ error: true, message: existTurn })
      return
    }

    if (validation.fails()) {
      yield response.status(422).json({ error: true, message: validation.messages() })
      return
    }

    if (body.service_id === 3) {
      body.end_at = moment(body.start_at).add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss')
    } else {
      body.end_at = moment(body.start_at).add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')
    }

    try {
      const schedule = new Schedule(body)
      yield schedule.save()
      yield response.status(200).json({ error: false, schedule: body })
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
