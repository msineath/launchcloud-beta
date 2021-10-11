'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artists', [
      {name: 'John Doe', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Skrillex', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Rusko', createdAt: new Date(), updatedAt: new Date()},
      {name: 'J Rabbit', createdAt: new Date(), updatedAt: new Date()},
      {name: "Skazi", createdAt: new Date(), updatedAt: new Date()}  
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artists', null, {});
  }
};
