'use strict'
const Moment = use('moment')
const Schedule = use('App/Model/Schedule')
const User = use('App/Model/User')
const Rol = use('App/Model/Rol')
const _ = use('lodash')
const { extendMoment } = use('moment-range')

const moment = extendMoment(Moment)

const ScheduleService = exports = module.exports = {}

ScheduleService.getAvailableTime = function * (startAt, endAt, service, step = 30) {
  const start = moment(`${startAt}`).subtract(3, 'hour')
  const end = moment(`${endAt}`).subtract(3, 'hour')
  const range = moment.range(start, end)
  const acc = Array.from(range.by('minutes', { step }))
  const availableTime = yield acc.map(function * (el) {
    const thereAvailable = yield ScheduleService.checkBarberAvailable(el, service.toJSON())

    const barbers = yield Rol.query().with('barbers').fetch()

    const barberCount = barbers.toJSON().find((el) => el.id === 3) || []
    const barbersBusy = thereAvailable.map((el) => el.user_id)

    if (thereAvailable.length !== barberCount.barbers.length) {
      let data = {
        date: el,
        barbers: _.difference(barberCount.barbers.map(el => el.id), barbersBusy)
      }

      data.barbers = yield User.query().where('id', 'IN', data.barbers).fetch()

      return data
    }
  })

  return availableTime.filter(function (el) { return el !== undefined })
}

ScheduleService.checkBarberAvailable = function * (time, services) {
  console.log(services)
  return services.filter((el) => {
    const start = new Date(`${el.start_at}`)
    const end = new Date(`${el.end_at}`)
    const range = moment.range(start, end)

    return range.contains(time, { excludeEnd: true })
  })
}

ScheduleService.getTodayServices = function * (startAt, service) {
  const schedule = yield Schedule.query()
          .where('service_id', service)
          .where('status', 0)
          .where('start_at', '>=', moment(`${startAt} 00:00:00`).format('YYYY-MM-DD HH:MM:SS'))
          .where('start_at', '<=', moment(`${startAt} 23:59:59`).format('YYYY-MM-DD HH:MM:SS'))
          .fetch()
  return schedule
}

ScheduleService.isWeekend = function * (date) {
  const day = new Date(date).getDay()
  return (day === 6) || (day === 0)
}
