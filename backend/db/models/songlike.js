'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongLike = sequelize.define('SongLike', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN,
    disliked: DataTypes.BOOLEAN
  }, {});
  SongLike.associate = function(models) {
    // associations can be defined here
  };
  return SongLike;
};