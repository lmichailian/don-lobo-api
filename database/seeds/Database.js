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

class DatabaseSeeder {
  * run () {
    yield User.create({
      email: 'admin@donlobo.com',
      username: 'donlobo',
      password: 'secret'
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
  }
}

module.exports = DatabaseSeeder
