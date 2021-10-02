'use strict';
module.exports = (sequelize, DataTypes) => {
  const albumCredit = sequelize.define('albumCredit', {
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  albumCredit.associate = function(models) {
    // associations can be defined here
  };
  return albumCredit;
};