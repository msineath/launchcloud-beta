const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { albumCredit } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const comments = await albumComment.findAll();
    return res.json(comments);
}));

module.exports = router;