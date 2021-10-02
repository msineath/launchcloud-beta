const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { SongLike } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const likes = await SongLike.findAll();
    return res.json(likes);
}));

module.exports = router;