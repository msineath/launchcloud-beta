'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongComment = sequelize.define('SongComment', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  SongComment.associate = function(models) {
    // associations can be defined here
  };
  return SongComment;
};