'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongCredit = sequelize.define('SongCredit', {
    songId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER
  }, {});
  SongCredit.associate = function(models) {
    // associations can be defined here
  };
  return SongCredit;
};