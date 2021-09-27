'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {title: 'Tequila Remix', albumId: 2, uploaderId: 1, genre: 'dubstep', releaseDate: new Date(2013, 7, 3), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1622217877063.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Ninja Step V2', albumId: 2, uploaderId: 1, genre: 'dubstep', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1622217877063.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: '{WHATEVERNAMEYOUWANT}', albumId: 3, uploaderId: 3, genre: 'indie', releaseDate: new Date(2020, 11, 24), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1622217877063.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'For Teh Lulz', albumId: 4, uploaderId: 4, genre: 'experimental', releaseDate: new Date(1997, 8, 16), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1622217877063.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Counting Circles', albumId: 5, uploaderId: 5, genre: 'trance', releaseDate: new Date(1998, 12, 15), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1622217877063.mp3', createdAt: new Date(), updatedAt: new Date()}
  ], {});
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
    
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};