'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {name: "Where the hell am I?!?", createdAt: new Date(), updatedAt: new Date()},
      {name: "Summoning the Toaster Demons", createdAt: new Date(), updatedAt: new Date()},
      {name: "{INSERTALBUMNAMEHERE}", createdAt: new Date(), updatedAt: new Date()},
      {name: "I Lost The Game", createdAt: new Date(), updatedAt: new Date()},
      {name: "Forever Aloof", createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};