'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

// const Factory = use('Factory')
const User = use('App/Model/User')
const Service = use('App/Model/Service')
const Rol = use('App/Model/Rol')
const Branch = use('App/Model/Branch')
const BranchSchedule = use('App/Model/BranchSchedule')

class DatabaseSeeder {
  * run () {
    yield User.create({
      email: 'admin@donlobo.com',
      username: 'donlobo',
      password: 'secret'
    })

    yield Rol.create({
      name: 'owner',
      tag: 'Dueño'
    })

    yield Rol.create({
      name: 'admin',
      tag: 'Administrador'
    })

    yield Rol.create({
      name: 'barber',
      tag: 'Barbero'
    })

    yield Rol.create({
      name: 'client',
      tag: 'Cliente'
    })

    yield Service.create({
      'service': 'Pelo',
      'cost': 200
    })

    yield Service.create({
      'service': 'Barba',
      'cost': 150
    })

    yield Service.create({
      'service': 'Pelo y Barba',
      'cost': 300
    })

    yield Service.create({
      'service': 'Bar',
      'cost': 0
    })

    yield Branch.create({
      address: 'Crespo 2999',
      name: 'Don Lobo Santa Fe'
    })

    yield BranchSchedule.create({
      branch_id: 1,
      open_at: '8:00',
      close_at: '12:30',
      days: 'week_morning'
    })

    yield BranchSchedule.create({
      branch_id: 1,
      open_at: '16:00',
      close_at: '21:30',
      days: 'week_afternoon'
    })

    yield BranchSchedule.create({
      branch_id: 1,
      open_at: '08:00',
      close_at: '13:00',
      days: 'weekend_morning'
    })
  }
}

module.exports = DatabaseSeeder
