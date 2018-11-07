'use strict'

const PostImage = use('App/Model/PostImage')
const Helpers = use('Helpers')

class PostImageController {
  * store (request, response) {
    const files = request.file('image')
    let dataFiles = {}

    yield files.move(`${Helpers.publicPath()}/uploads`, files.file.name)

    if (files.moved) {
      dataFiles = {
        name: files.file.name,
        path: `/uploads/${files.file.name}`
      }
    }

    const postImage = new PostImage({
      post_id: request.param('id'),
      ...dataFiles
    })

    yield postImage.save()
    yield response.status(200).json({ error: false, postImage })
  }

  * delete (request, response) {
    try {
      const image = yield PostImage.findBy('id', request.param('id'))

      if (!image) {
        yield response.status(404).json({ error: true, message: 'El recurso que quiere eliminar no existe' })
      }

      yield image.delete()
      yield response.status(200).json({ error: false, message: 'El recurso se eliminó con exito' })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = PostImageController
