'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {name: "John Doe - Untitled", createdAt: new Date(), updatedAt: new Date()},
      {name: "Skrillex - Untitled", createdAt: new Date(), updatedAt: new Date()},
      {name: "Recess", createdAt: new Date(), updatedAt: new Date()},
      {name: "Rusko - Untitled", createdAt: new Date(), updatedAt: new Date()},
      {name: "Babylon: Volume 1", createdAt: new Date(), updatedAt: new Date()},
      {name: "Everyday", createdAt: new Date(), updatedAt: new Date()},
      {name: "Somewhere Around Barstow / Bopper Shuffle", createdAt: new Date(), updatedAt: new Date()},
      {name: "Too Much Sexy", createdAt: new Date(), updatedAt: new Date()},
      {name: "Storm", createdAt: new Date(), updatedAt: new Date()},
      {name: "Skazi - Untitled", createdAt: new Date(), updatedAt: new Date()},
      {name: "Spin", createdAt: new Date(), updatedAt: new Date()},
      {name: "Total Anarchy", createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};