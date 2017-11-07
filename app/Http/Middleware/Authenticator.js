'use strict'

class Authenticator {

  /**
   * Check user is authenticated
   *  
   * @param {*} request 
   * @param {*} response 
   * @param {*} next 
   */
  * handle (request, response, next) {
    const isLoggedIn = yield  request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized({error: true, message: 'Your must be loggedin to access this resource.'})
      return
    }
    yield next
  }

}

module.exports = Authenticator
