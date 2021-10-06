const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {Song, SongCredit, albumCredit} = require('../../db/models');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awS3');

router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    
    return res.json(songs);
}));

router.post('/add',singleMulterUpload('audioTrackUrl'), asyncHandler(async (req, res) => {
    const {title, albumId, uploaderId, genre, releaseDate} = req.body;
    const audioTrackUrl = await singlePublicFileUpload(req.file);
    const newSong = await Song.upload({title, albumId, uploaderId, genre, releaseDate, audioTrackUrl});
    const newSongCredit = await SongCredit.create({['songId']: newSong.id, ['artistId']: uploaderId});
    const newAlbumCredit = await albumCredit.create({['artistId']: uploaderId, ['albumId']: albumId})
    return res.json({newSong, newSongCredit, newAlbumCredit})
}));

router.delete('/:id/delete', asyncHandler (async (req, res) => {
    const song = await Song.findByPk(Number(req.params.id));
    await song.destroy();
    return  res.json(song);
}));

router.patch('/:id', asyncHandler(async (req, res) => {
    const {targetKey, areaText} = req.body;
    const id = req.params.id;

    await Song.update(
        {[targetKey]: areaText},
        {where: {id}}
    );

    const song = await Song.findByPk(id);
    return res.json(song);
}));

module.exports = router;