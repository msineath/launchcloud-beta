const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { albumLike } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const likes = await albumLike.findAll();
    return res.json(likes);
}));

module.exports = router;