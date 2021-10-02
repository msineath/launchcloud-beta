const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { AlbumLike } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const likes = await AlbumLike.findAll();
    return res.json(likes);
}));

module.exports = router;