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
  Route.get('/customers-all', 'CustomerController.indexAll')

  // Users routes
  Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UserController.show')
  Route.post('/users', 'UserController.store')
  Route.put('/users/:id', 'UserController.update')
  Route.delete('/users/:id', 'UserController.delete')

  Route.put('/users/:id/status', 'UserController.status')

  Route.get('/barbers', 'BarbersController.index')

  // Posts routes
  Route.get('/posts', 'PostsController.index')
  Route.post('/posts', 'PostsController.store')
  Route.get('/posts/:id', 'PostsController.show')
  Route.put('/posts/:id', 'PostsController.update')
  Route.delete('/posts/:id', 'PostsController.delete')

  Route.put('/posts/:id/status', 'PostsController.status')

  Route.delete('/post-images/:id', 'PostImageController.delete')
  Route.post('/post-images/:id', 'PostImageController.store')

  Route.get('/products', 'ProductsController.index')
  Route.post('/products', 'ProductsController.store')
  Route.get('/products/:id', 'ProductsController.show')
  Route.put('/products/:id', 'ProductsController.update')
  Route.delete('/products/:id', 'ProductsController.delete')

  Route.put('/products/:id/status', 'ProductsController.status')

  Route.delete('/product-images/:id', 'ProductImageController.delete')
  Route.post('/product-images/:id', 'ProductImageController.store')

  // Users routes
  Route.get('/schedule', 'ScheduleController.index')
  Route.get('/schedule-today', 'ScheduleController.today')
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
