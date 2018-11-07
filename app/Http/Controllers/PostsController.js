'use strict'

const Post = use('App/Model/Post')
const Validator = use('Validator')
const Helpers = use('Helpers')
const moment = use('moment')

class PostsController {
  * index (request, response) {
    const posts = yield Post.all()
    yield response.status(200).json({ error: false, posts })
  }

  * show (request, response) {
    try {
      const post = yield Post.query().with('images').where('id', request.param('id')).first()
      yield response.json({post})
    } catch (e) {
      console.log(e)
      response.status(500).json({ error: true, message: e.message })
    }
  }

  * store (request, response) {
    const { body, title, time, location } = request.all()

    const validation = yield Validator.validate(request.all(), Post.createRules, Post.messages)
    const files = request.file('images')
    let dataFiles = []

    if (validation.fails()) {
      return response.status(422).json({ error: true, message: validation.messages() })
    }

    try {
      for (let item of files) {
        yield item.move(`${Helpers.publicPath()}/uploads`, item.file.name)

        if (item.moved) {
          dataFiles.push({
            name: item.file.name,
            path: `/uploads/${item.file.name}`
          })
        }
      }

      const post = new Post({ body, title, time, location })
      yield post.save()

      yield post.images().createMany(dataFiles)

      yield response.status(200).json({ error: false, post })
    } catch (e) {
      console.log('ERROR_POST', e)
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

  * status (request, response) {
    const post = yield Post.findBy('id', request.param('id'))

    if (!post) {
      yield response.status(404).json({ error: true, message: 'El recurso que quiere actualizar no existe' })
    }

    try {
      post.status = !post.status
      yield post.save()
      yield response.status(200).json({ error: false, message: 'El estado se cambio con éxito', post })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = PostsController
