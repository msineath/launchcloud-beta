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

  Song.upload = async function({title, albumId, uploaderId, genre, releaseDate, audioTrackUrl}) {
    const titleChecker = await Song.findOne({where: {title}});
    
    if(titleChecker) albumChecker = await Song.findOne({where:{albumId}});
    
    //TODO: ADD ERROR IF ALREADY
    if(titleChecker && albumChecker) return;

    return await Song.create({title, albumId, uploaderId, genre, releaseDate, audioTrackUrl /*, waveformImageLocation*/});
  }
  
  Song.associate = function(models) {
    Song.belongsTo(models.Album, { foreignKey: 'albumId' });

    const SongCommentColumnMapping = {
      through: 'SongComment', 
      otherKey: 'userId',
      foreignKey: 'songId'
    };

    Song.belongsToMany(models.Artist, SongCreditColumnMapping);
  };
  return Song;
};