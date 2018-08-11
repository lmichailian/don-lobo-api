'use strict'

const Lucid = use('Lucid')

class Branch extends Lucid {
  static get table () {
    return 'branches'
  }
}

module.exports = Branch
