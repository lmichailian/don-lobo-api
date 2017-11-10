'use strict'

const Validator = use('Validator')
const Customer = use('App/Model/Customer')
const Credit  = use('App/Model/Credit')

class CreditController {

    /**
     * 
     * @param {*} request 
     * @param {*} response 
     */
    * store (request, response) { 

        const validation = yield Validator.validate(request.all(), Credit.createRules, Credit.messages)

        if (validation.fails()) {
            response.status(422).json({error: true, message: validation.messages()})
            return
        }
        
        try {
            const customer = yield Customer.findByOrFail('card', request.input('card'))
            const credit = new Credit({
                amount: request.input('amount'),
                customer_id: customer.id
            })
            yield credit.save()
            yield response.status(201).json({error: false, credit: credit})
        } catch (e) {
            yield response.status(500).json({error: true, message: e.message})
        }
        
    }

}

module.exports = CreditController
