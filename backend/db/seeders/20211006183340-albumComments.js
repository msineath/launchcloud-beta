'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AlbumComments', [
      {albumId: 1, comment: 'Headbanged until my face fell off!!!', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 2, comment: 'Awesome concept, poor execution', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 3, comment: 'not really sure what to think...3/5', userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 4, comment: "meh, didn't like", userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {albumId: 5, comment: 'good times', userId: 5, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AlbumComments', null, {});
  }
};