'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', function * (request, response) {
  response.send('This is the home page, To access the api: http://api-donlobo.rockerlabs.co/api/v1')
})

Route.post('/login', 'UserController.login')

/**
 * Routing api donlobo v1
 */
Route.group('version1', function () {
  Route.get('/', function * (request, response) {
    response.send('OK, API working correctly')
  })

  // User routes
  Route.get('/me', 'UserController.user')

  // Customers routes
  Route.get('/customers', 'CustomerController.index')
  Route.get('/customers/:id', 'CustomerController.show')
  Route.post('/customers', 'CustomerController.store')
  Route.put('/customers/:id', 'CustomerController.update')
  Route.delete('/customers/:id', 'CustomerController.delete')

  // Users routes
  Route.get('/users', 'UserController.index')
  Route.post('/users', 'UserController.store')
  Route.put('/users/:id', 'UserController.update')
  Route.delete('/users/:id', 'UserController.delete')

  // Users routes
  Route.get('/schedule', 'ScheduleController.index')
  Route.post('/schedule', 'ScheduleController.store')
  Route.put('/schedule/:id', 'ScheduleController.update')
  Route.delete('/schedule/:id', 'ScheduleController.delete')

  Route.put('/schedule/:id/status', 'ScheduleController.status')

  // Claims routes
  Route.get('/claims', 'ClaimsController.index')
  Route.post('/claims', 'ClaimsController.store')

  // Credit routes
  Route.post('/credits', 'CreditController.store')
  Route.get('/credits/customers/:card', 'CreditController.show')

  // Charge Service routes
  Route.post('/services/charges', 'ServiceController.store')

  // Transaction routes
  Route.get('/transactions', 'TransactionController.index')
  Route.get('/transactions/customers/:id', 'TransactionController.show')
})
  .prefix('/api/v1')
  .middleware('authApi')
