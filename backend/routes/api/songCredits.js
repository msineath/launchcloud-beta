const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { SongCredit } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const credits = await SongCredit.findAll();
    return res.json(credits);
}));

module.exports = router;