'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AlbumLikes', [
      {userId: 2, albumId: 1, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, albumId: 2, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, albumId: 3, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()},
      {userId: 5, albumId: 4, liked: false, disliked: true, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 5, liked: true, disliked: false, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AlbumLikes', null, {});
  }
};
