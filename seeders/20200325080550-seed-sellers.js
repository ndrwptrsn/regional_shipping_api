'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        queryInterface.bulkInsert('Sellers', [{
          username: 'ndrwptrsn',
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
