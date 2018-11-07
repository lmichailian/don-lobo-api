'use strict'

const Lucid = use('Lucid')
const Env = use('Env')

class PostImage extends Lucid {
  static get table () {
    return 'post_images'
  }

  getPath (path) {
    return `${Env.get('BASE_URL')}${path}`
  }
}

module.exports = PostImage
