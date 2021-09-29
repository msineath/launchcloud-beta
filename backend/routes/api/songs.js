const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {Song} = require('../../db/models');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awS3');

router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    return res.json({songs});
}));

router.post('/add',singleMulterUpload('audioTrackUrl'), asyncHandler(async (req, res) => {
    const {title, albumId, uploaderId, genre, releaseDate} = req.body;
    const audioTrackUrl = await singlePublicFileUpload(req.file);
    const newSong = await Song.upload({title, albumId, uploaderId, genre, releaseDate, audioTrackUrl});
    return res.json({newSong})
}));

router.delete('/:id/delete', asyncHandler (async (req, res) => {
    const song = await Song.findByPk(Number(req.params.id));
    await song.destroy();
    return  res.json({song})
}));

module.exports = router;