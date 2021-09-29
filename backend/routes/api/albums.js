const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {Album, AlbumComment, AlbumLike} = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const albums = (await Album.findAll());
    return res.json(albums);
}));

module.exports = router;