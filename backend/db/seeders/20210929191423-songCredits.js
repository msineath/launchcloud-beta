'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SongCredits', [
      {songId: 1, artistId: 1, createdAt: new Date(), updatedAt: new Date()},
      {songId: 2, artistId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 3, artistId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 4, artistId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 5, artistId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 6, artistId: 3, createdAt: new Date(), updatedAt: new Date()},
      {songId: 7, artistId: 3, createdAt: new Date(), updatedAt: new Date()},
      {songId: 8, artistId: 3, createdAt: new Date(), updatedAt: new Date()},
      {songId: 9, artistId: 4, createdAt: new Date(), updatedAt: new Date()},
      {songId: 10, artistId: 4, createdAt: new Date(), updatedAt: new Date()},
      {songId: 11, artistId: 4, createdAt: new Date(), updatedAt: new Date()},
      {songId: 12, artistId: 5, createdAt: new Date(), updatedAt: new Date()},
      {songId: 13, artistId: 5, createdAt: new Date(), updatedAt: new Date()},
      {songId: 14, artistId: 5, createdAt: new Date(), updatedAt: new Date()},
      {songId: 15, artistId: 5, createdAt: new Date(), updatedAt: new Date()},
      {songId: 16, artistId: 5, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SongCredits', null, {});
  }
};