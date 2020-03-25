'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        queryInterface.bulkInsert('Rules', [{
          label: 'minimum_price',
          parameters: JSON.stringify({
            value: 1000,
            function: '>'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          label: 'seasons',
          parameters: JSON.stringify({
            value: ['spring', 'fall'],
            function: 'in'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }], {})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
      ])
    })
  }
};
