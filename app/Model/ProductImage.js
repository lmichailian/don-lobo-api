'use strict'

const Lucid = use('Lucid')
const Env = use('Env')

class ProductImage extends Lucid {
  static get table () {
    return 'product_images'
  }

  getPath (path) {
    return `${Env.get('BASE_URL')}${path}`
  }
}

module.exports = ProductImage
