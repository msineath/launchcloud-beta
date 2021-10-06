const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { AlbumComment } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const comments = await AlbumComment.findAll();
    return res.json(comments);
}));

module.exports = router;