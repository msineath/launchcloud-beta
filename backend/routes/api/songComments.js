const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { SongComment } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const comments = await SongComment.findAll();
    return res.json(comments);
}));

router.post('/add/:songId', asyncHandler(async (req, res) => {
    const {commentText, userId} = req.body;
    const songId = req.params.songId;
    const newComment = await SongComment.create({songId, comment: commentText, userId});
    return res.json(newComment);
}));

module.exports = router;