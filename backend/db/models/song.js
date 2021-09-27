'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    albumId: DataTypes.INTEGER,
    uploaderId: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    audioTrackUrl: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Album, { foreignKey: 'albumId' });
  };
  return Song;
};