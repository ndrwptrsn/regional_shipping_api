'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        queryInterface.bulkInsert('Rules', [{
          label: 'eligible_seller',
          target: 'seller',
          operator: 'in',
          comparator: JSON.stringify({
            model: 'Seller',
            attribute: 'username'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          label: 'eligible_category',
          target: 'category',
          operator: 'in',
          comparator: JSON.stringify({
            model: 'Category',
            attribute: 'ebay_id'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          label: 'minimum_price',
          target: 'price',
          operator: '>',
          comparator: JSON.stringify([1000]),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          label: 'active_season',
          target: 'date',
          operator: 'between',
          comparator: JSON.stringify(['1591230018000', '1593822018000']),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          label: 'pricerange',
          target: 'price',
          operator: 'between',
          comparator: JSON.stringify([59999, 57777]),
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
