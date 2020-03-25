'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        queryInterface.addIndex(
          'Sellers',
          ['username']
        )
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeIndex('Sellers', ['username'])
      ])
    })
  }
};
