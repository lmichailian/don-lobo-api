'use strict'

const Lucid = use('Lucid')

class Transaction extends Lucid {


    /**
     * 
     */
    customer () {
        return this.belongsTo('App/Model/Customer')
    }


    /**
     * 
     */
    service () {
        return this.belongsTo('App/Model/Service') 
    }
    
}

module.exports = Transaction
