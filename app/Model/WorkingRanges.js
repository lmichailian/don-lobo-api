'use strict'

const Lucid = use('Lucid')

class WorkingRanges extends Lucid {
  static get table () {
    return 'working_range'
  }
}

module.exports = WorkingRanges
