const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { AlbumComment } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const comments = await AlbumComment.findAll();
    return res.json(comments);
}));

router.post('/add/:albumId', asyncHandler(async (req, res) => {
    const {commentText, userId} = req.body;
    const albumId = req.params.albumId;
    const newComment = await AlbumComment.create({albumId, comment: commentText, userId});
    return res.json(newComment);
}));

router.patch('/edit/:commentId', asyncHandler(async (req,res) => {
    const {commentText} = req.body;
    const id = req.params.commentId;
    const updatedComment = await AlbumComment.update({comment: commentText},
        {where: {
            id 
        },
        returning: true
        }
    );
    return res.json(updatedComment);
}))

module.exports = router;