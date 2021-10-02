'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artists', [
      {name: 'J Rabbit', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Arigato Demo', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Flaming Opals', createdAt: new Date(), updatedAt: new Date()},
      {name: 'ThisIsOurBandName', createdAt: new Date(), updatedAt: new Date()},
      {name: "Party 'til I Die", createdAt: new Date(), updatedAt: new Date()}  
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artists', null, {});
  }
};
