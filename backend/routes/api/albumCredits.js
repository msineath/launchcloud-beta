const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { albumCredit } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const credits = await albumCredit.findAll();
    return res.json(credits);
}));

module.exports = router;