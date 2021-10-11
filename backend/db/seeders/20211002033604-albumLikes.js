'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AlbumLikes', [
      {userId: 2, albumId: 1, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, albumId: 4, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, albumId: 3, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, albumId: 7, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, albumId: 2, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, albumId: 6, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, albumId: 9, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, albumId: 12, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, albumId: 13, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 5, albumId: 4, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 5, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 11, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 12, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 10, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 6, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 2, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AlbumLikes', null, {});
  }
};
