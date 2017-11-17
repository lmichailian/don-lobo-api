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
    //User routes

    Route.get('/me', 'UserController.user')
    // Customers routes
    Route.get('/customers', 'CustomerController.index')
    Route.post('/customer', 'CustomerController.store')
    Route.put('/customer/:id', 'CustomerController.update')
    Route.delete('/customer/:id', 'CustomerController.delete')

    // Credit routes
    Route.post('/credit', 'CreditController.store')
    Route.get('/credit/customer/:card', 'CreditController.show')

    // Charge Service routes
    Route.post('/service/charge', 'ServiceController.store')

    // Transaction routes
    Route.get('/transactions', 'TransactionController.index')
    Route.get('/transaction/customer/:id', 'TransactionController.show')
})
    .prefix('/api/v1')
    .middleware('authApi')
