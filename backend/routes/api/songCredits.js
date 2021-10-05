const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { SongCredit } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const credits = await SongCredit.findAll();
    return res.json(credits);
}));

router.post('/add', asyncHandler(async (req, res) => {
    const {songId, artistId} = req.body;
    const newSongCredit = await SongCredit.create({songId, artistId});
    return res.json({newSongCredit})
}));

module.exports = router;