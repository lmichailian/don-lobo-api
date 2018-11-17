'use strict'

const ProductImage = use('App/Model/ProductImage')
const Helpers = use('Helpers')

class ProductImageController {
  * store (request, response) {
    try {
      const files = request.file('image')
      let dataFiles = {}

      yield files.move(`${Helpers.publicPath()}/uploads`, files.file.name)

      if (files.moved) {
        dataFiles = {
          name: files.file.name,
          path: `/uploads/${files.file.name}`
        }
      }

      const productImage = new ProductImage({
        product_id: request.param('id'),
        ...dataFiles
      })

      yield productImage.save()
      yield response.status(200).json({ error: false, productImage })
    } catch (e) {
      console.log(e)
      yield response.status(500).json({ error: true, e })
    }
  }

  * delete (request, response) {
    try {
      const image = yield ProductImage.findBy('id', request.param('id'))

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

module.exports = ProductImageController
