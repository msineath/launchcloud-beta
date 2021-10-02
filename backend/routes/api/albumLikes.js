const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { AlbumLike } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const likes = await AlbumLike.findAll();
    return res.json(likes);
}));

router.patch('/:albumId', asyncHandler(async (req, res) => {
    const { userId, targetKey } = req.body;
    const id = Number(req.params.albumId);
    const like = await AlbumLike.findOne(
        {
            where: 
            {
                albumId: id,
                userId
            }
        }
    );
    
    if(like.length < 1) {
        
        const newLikeStats = {
            userId,
            albumId : id
        };

        if(targetKey === 'liked') {
            newLikeStats['like'] = true;
            newLikeStats['unlike'] = false;
        } else {
            newLikeStats['liked'] = false;
            newLikeStats['disliked'] = true;
        };

        const newLike = await AlbumLike.create(newLikeStats)
        return res.json(newLike);

     } else {
        if(targetKey === 'dislike') {
            const updatedInfo = await AlbumLike.update(
                {
                    liked: false,
                    disliked: true
                },
                {
                    where:
                        {
                            userId,
                            albumId: id
                        }
                }
            );

            return res.json(updatedInfo);

        } else {

            const updatedInfo = await AlbumLike.update(
                {
                    liked: true,
                    disliked: false
                },
                {
                    where:
                        {
                            userId,
                            albumId: id                         
                        }
                }
            );

            return res.json(updatedInfo);
        }
     }
}));

module.exports = router;