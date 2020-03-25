'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        queryInterface.addIndex(
          'Categories',
          ['ebay_id']
        )
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeIndex('Categories', ['ebay_id'])
      ])
    })
  }
};
