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

Route.post('/login', 'UserController.login')

/**
 * Routing api donlobo v1
 */
Route.group('version1', function () {
    // User routes
  Route.get('/me', 'UserController.user')
    // Customers routes
  Route.get('/customers', 'CustomerController.index')
  Route.post('/customers', 'CustomerController.store')
  Route.put('/customers/:id', 'CustomerController.update')
  Route.delete('/customers/:id', 'CustomerController.delete')

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
