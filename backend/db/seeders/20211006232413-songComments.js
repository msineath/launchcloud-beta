'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SongComments', [
      {songId: 1, comment: 'Super awesome song!!!', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {songId: 2, comment: 'Best song on the album', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 3, comment: 'so-so', userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {songId: 4, comment: 'how is this making money?', userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {songId: 5, comment: "made me dig out my poi", userId: 5, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SongComments', null, {});
  }
};