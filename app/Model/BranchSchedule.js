'use strict'

const Lucid = use('Lucid')

class BranchSchedule extends Lucid {
  static get table () {
    return 'branch_schedule'
  }
}

module.exports = BranchSchedule
