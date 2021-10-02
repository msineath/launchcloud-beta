'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SongLikes', [
      {userId: 1, songId: 1, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, songId: 2, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, songId: 3, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, songId: 4, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 5, songId: 5, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SongLikes', null, {});
  }
};
