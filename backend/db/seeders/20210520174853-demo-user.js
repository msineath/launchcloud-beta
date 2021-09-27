'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {username: 'John Doe', email: 'erss@gmail.com', hashedPassword: bcrypt.hashSync('password')},
      // {username: 'John Doe@gmail.com', email: 'erss@gmail.com', hashedPassword: bcrypt.hashSync('password')},
      {username: 'asvfafvrfv', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password())},
      {username: 'asvgtrdgtghfafvrfv', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password())},
      {username: 'asvfaf', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password())},
      {username: 'asvfa77fvrfv', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password())},
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['John Doe', 'asvfafvrfv', 'asvgtrdgtghfafvrfv', 'asvfaf', 'asvfa77fvrfv']}
    }, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
