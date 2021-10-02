const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Artist } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const artists = await Artist.findAll();
    return res.json(artists);
}));

module.exports = router;