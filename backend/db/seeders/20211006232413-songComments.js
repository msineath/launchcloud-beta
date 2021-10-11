'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SongComments', [
      {songId: 1, comment: 'Super awesome song!!!', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {songId: 2, comment: 'Best song on the album', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 3, comment: 'so-so', userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {songId: 4, comment: 'how is this making money?', userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {songId: 5, comment: "made me dig out my poi", userId: 5, createdAt: new Date(), updatedAt: new Date()},
      {songId: 6, comment: 'Decent', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {songId: 7, comment: 'Wooo!', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 8, comment: 'alright', userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {songId: 9, comment: 'not too bad', userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {songId: 10, comment: "haven't heard this in ages...", userId: 5, createdAt: new Date(), updatedAt: new Date()},
      {songId: 11, comment: 'interesting', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {songId: 12, comment: 'love it', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {songId: 13, comment: 'catchy', userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {songId: 14, comment: 'never heard something like this before...', userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {songId: 15, comment: "play on repeat", userId: 5, createdAt: new Date(), updatedAt: new Date()},
      {songId: 16, comment: "could take it or leave it", userId: 5, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SongComments', null, {});
  }
};