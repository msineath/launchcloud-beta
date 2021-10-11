'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AlbumComments', [
      {albumId: 3, comment: 'not really sure what to think...3/5', userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 5, comment: 'good times', userId: 5, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 5, comment: 'awesome album!', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 6, comment: 'Headbanged until my face fell off!!!', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 8, comment: 'not bad', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 9, comment: "meh, didn't like", userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 10, comment: 'reminds me of old times...', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 12, comment: 'Awesome concept, poor execution', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 13, comment: 'ok', userId: 3, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AlbumComments', null, {});
  }
};