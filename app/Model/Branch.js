'use strict'

const Lucid = use('Lucid')

class Branch extends Lucid {
  static get table () {
    return 'branches'
  }

  branchSchedule () {
    return this.hasMany('App/Model/BranchSchedule')
  }
}

module.exports = Branch
