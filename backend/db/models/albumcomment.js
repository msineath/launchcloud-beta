'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumComment = sequelize.define('AlbumComment', {
    albumId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  AlbumComment.associate = function(models) {
    // associations can be defined here
  };
  return AlbumComment;
};