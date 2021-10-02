'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
    const SongCreditColumnMapping = {
      through: 'SongCredit',
      otherKey: 'songId',
      foreignKey: 'artistId'
    };
    
    Artist.belongsToMany(models.Song, SongCreditColumnMapping);
  };
  return Artist;
};