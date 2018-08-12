'use strict'

const Post = use('App/Model/Post')
const Validator = use('Validator')

class PostsController {
  * index (request, response) {
    const posts = yield Post.all()
    yield response.status(200).json({error: false, posts})
  }

  * store (request, response) {
    const {body, title, time, location, images} = request.all()
    const validation = yield Validator.validate(request.all(), Post.createRules, Post.messages)

    if (validation.fails()) {
      return response.status(422).json({ error: true, message: validation.messages() })
    }

    try {
      const post = new Post({body, title, time, location})
      yield post.save()

      yield response.status(200).json({ error: false, post })
    } catch (e) {
      response.status(500).json({ error: true, message: e.message })
    }
  }

  * update (request, response) {
    const body = request.all()

    const validation = yield Validator.validate(body, Post.createRules, Post.messages)

    if (validation.fails()) {
      return response.status(422).json({ error: true, message: validation.messages })
    }

    try {
      const post = yield Post.find(request.param('id'))

      post.title = body.title
      post.body = body.body
      post.time = body.time || null
      post.location = body.location

      yield post.save()

      yield response.status(200).json({ error: false, post })
    } catch (e) {
      response.status(500).json({ error: true, message: e.message })
    }
  }

  * delete (request, response) {
    try {
      const user = yield Post.findBy('id', request.param('id'))

      if (!user) {
        yield response.status(404).json({ error: true, message: 'El recurso que quiere eliminar no existe' })
      }

      yield user.delete()
      yield response.status(200).json({ error: false, message: 'El recurso se eliminó con exito' })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = PostsController
