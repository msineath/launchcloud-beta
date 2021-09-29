'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SongCredits', [
      {songId: 1, artistId: 1, createdAt: new Date(), updatedAt: new Date()},
      {songId: 2, artistId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 3, artistId: 3, createdAt: new Date(), updatedAt: new Date()},
      {songId: 4, artistId: 4, createdAt: new Date(), updatedAt: new Date()},
      {songId: 5, artistId: 5, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SongCredits', null, {});
  }
};