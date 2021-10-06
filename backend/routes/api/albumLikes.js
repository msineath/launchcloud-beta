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
    const albumId = Number(req.params.albumId);
    const like = await AlbumLike.findOne(
        {
            where: 
            {
                albumId,
                userId
            }
        }
    );

    if(!like) {
        
        const newLikeStats = {
            userId,
            albumId
        };
        
        if(targetKey === 'liked') {
            newLikeStats['liked'] = true;
            newLikeStats['disliked'] = false;
        } else {
            newLikeStats['liked'] = false;
            newLikeStats['disliked'] = true;
        };
        
        const newLike = await AlbumLike.create(newLikeStats)
        return res.json( newLike);
        
    } else {
        if(targetKey === 'dislike') {
            const updatedInfo = await AlbumLike.update(
                {['liked']: false, ['disliked']: true},
                {where:{
                    userId,
                    albumId
                },
                returning: true
                }
            );
            
            return res.json(updatedInfo[1][0]);
            
        } else {
            
            const updatedInfo = await AlbumLike.update(
                {
                    ['liked']: true,
                    ['disliked']: false
                },
                {
                    where:
                    {
                        userId,
                        albumId                       
                    },
                    returning: true
                }
                );
            return res.json(updatedInfo[1][0]);
        }
     }
}));

module.exports = router;