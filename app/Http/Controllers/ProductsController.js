'use strict'

const Product = use('App/Model/Product')
const Validator = use('Validator')
const Helpers = use('Helpers')
const moment = use('moment')

class ProductsController {
  * index (request, response) {
    const products = yield Product.all()
    yield response.status(200).json({ error: false, products })
  }

  * show (request, response) {
    try {
      const product = yield Product.query().with('images').where('id', request.param('id')).first()
      yield response.json({product})
    } catch (e) {
      console.log(e)
      response.status(500).json({ error: true, message: e.message })
    }
  }

  * store (request, response) {
    const { description, name, price } = request.all()

    const validation = yield Validator.validate(request.all(), Product.createRules, Product.messages)
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

      const product = new Product({ description, name, price })
      yield product.save()

      yield product.images().createMany(dataFiles)

      yield response.status(200).json({ error: false, product })
    } catch (e) {
      console.log('ERROR_POST', e)
      response.status(500).json({ error: true, message: e.message })
    }
  }

  * update (request, response) {
    const body = request.all()

    const validation = yield Validator.validate(body, Product.createRules, Product.messages)

    if (validation.fails()) {
      return response.status(422).json({ error: true, message: validation.messages })
    }

    try {
      const product = yield Product.find(request.param('id'))

      product.name = body.name
      product.description = body.description
      product.price = body.price

      yield product.save()

      yield response.status(200).json({ error: false, product })
    } catch (e) {
      response.status(500).json({ error: true, message: e.message })
    }
  }

  * delete (request, response) {
    try {
      const user = yield Product.findBy('id', request.param('id'))

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
    const product = yield Product.findBy('id', request.param('id'))

    if (!product) {
      yield response.status(404).json({ error: true, message: 'El recurso que quiere actualizar no existe' })
    }

    try {
      product.status = !product.status
      yield product.save()
      yield response.status(200).json({ error: false, message: 'El estado se cambio con éxito', product })
    } catch (e) {
      yield response.status(500).json({ error: true, message: e.message })
    }
  }
}

module.exports = ProductsController
