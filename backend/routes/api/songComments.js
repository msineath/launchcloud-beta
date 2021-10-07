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

router.patch('/edit/:commentId', asyncHandler(async (req,res) => {
    const {commentText} = req.body;
    const id = req.params.commentId;
    const updatedComment = await SongComment.update({comment: commentText},
        {where: {
            id 
        },
        returning: true
        }
    );
    return res.json(updatedComment);
}));

router.delete('/delete/:commentId', asyncHandler(async (req, res) => {
    const id = req.params.commentId;
    const comment = await SongComment.findByPk(id);
    await comment.destroy();
    return res.json(comment);
}));

module.exports = router;