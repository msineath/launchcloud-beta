'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SongLikes', [
      {userId: 1, songId: 1, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, songId: 4, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, songId: 6, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, songId: 2, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, songId: 5, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, songId: 2, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, songId: 12, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, songId: 8, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, songId: 14, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, songId: 1, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, songId: 11, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, songId: 3, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 5, songId: 15, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 5, songId: 4, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SongLikes', null, {});
  }
};
