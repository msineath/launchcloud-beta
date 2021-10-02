'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumLike = sequelize.define('AlbumLike', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN,
    disliked: DataTypes.BOOLEAN
  }, {});
  AlbumLike.associate = function(models) {
    // associations can be defined here
  };
  return AlbumLike;
};