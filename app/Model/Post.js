'use strict'

const Lucid = use('Lucid')

class Post extends Lucid {
  static get createRules () {
    return {
      title: 'required',
      body: 'required'
    }
  }

  static get messages () {
    return {
      'title.required': 'El titulo es requerido',
      'body.required': 'El cuerpo del mensaje es requerido'
    }
  }
}

module.exports = Post
