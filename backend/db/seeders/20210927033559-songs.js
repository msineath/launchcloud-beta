'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {title: 'Halloween theme', albumId: 1, uploaderId: 1, genre: 'Classical', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633922797602.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Bring Out The Devil', albumId: 2, uploaderId: 2, genre: 'Dubstep', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633923190423.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Reptile', albumId: 2, uploaderId: 2, genre: 'Dubstep', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633923333674.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Nothing Yet', albumId: 2, uploaderId: 2, genre: 'Dubstep', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633923241105.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Ragga Bomb', albumId: 3, uploaderId: 2, genre: 'Dubstep', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633923288997.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Beetoven', albumId: 4, uploaderId: 3, genre: 'Dubstep', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633922608418.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Jahova', albumId: 5, uploaderId: 3, genre: 'Dubstep', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633922957584.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Everyday', albumId: 6, uploaderId: 3, genre: 'Dubstep', releaseDate: new Date(2015, 3, 12), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633923003233.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Tequila Remix', albumId: 7, uploaderId: 4, genre: 'dubstep', releaseDate: new Date(2013, 7, 3), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1622217877063.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Bopper Shuffle', albumId: 8, uploaderId: 4, genre: 'dubstep', releaseDate: new Date(2013, 7, 3), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633922737751.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Too Much Sexy', albumId: 9, uploaderId: 4, genre: 'dubstep', releaseDate: new Date(2013, 7, 3), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633922912216.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'GTR', albumId: 10, uploaderId: 5, genre: 'PsyTrance', releaseDate: new Date(2020, 11, 24), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633922683049.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Heathens', albumId: 11, uploaderId: 5, genre: 'PsyTrance', releaseDate: new Date(1997, 8, 16), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633922855356.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Brothers', albumId: 12, uploaderId: 5, genre: 'PsyTrance', releaseDate: new Date(1998, 12, 15), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633923049615.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Move Away', albumId: 13, uploaderId: 5, genre: 'PsyTrance', releaseDate: new Date(1998, 12, 15), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633923093773.mp3', createdAt: new Date(), updatedAt: new Date()},
      {title: 'Outer Space', albumId: 13, uploaderId: 5, genre: 'PsyTrance', releaseDate: new Date(1998, 12, 15), audioTrackUrl: 'https://audiobucketofdoom.s3.amazonaws.com/1633923132243.mp3', createdAt: new Date(), updatedAt: new Date()}
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