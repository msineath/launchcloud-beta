const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { SongLike } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const likes = await SongLike.findAll();
    return res.json(likes);
}));

router.patch('/:songId', asyncHandler(async (req, res) => {
    const { userId, targetKey } = req.body;
    const songId = Number(req.params.songId);
    const like = await SongLike.findOne(
        {
            where: 
            {
                songId,
                userId
            }
        }
    );

    if(!like) {
        
        const newLikeStats = {
            userId,
            songId
        };
        
        if(targetKey === 'like') {
            newLikeStats['liked'] = true;
            newLikeStats['disliked'] = false;
        } else {
            newLikeStats['liked'] = false;
            newLikeStats['disliked'] = true;
        };
        
        const newLike = await SongLike.create(newLikeStats)
        return res.json( newLike);
        
    } else {
        if(targetKey === 'dislike') {
            const updatedInfo = await SongLike.update(
                {['liked']: false, ['disliked']: true},
                {where:{
                    userId,
                    songId
                },
                returning: true
            }
            );
            
            return res.json(updatedInfo[1][0]);
            
        } else {
            
            const updatedInfo = await SongLike.update(
                {
                    ['liked']: true,
                    ['disliked']: false
                },
                {
                    where:
                    {
                        userId,
                        songId                       
                    },
                    returning: true
                }
                );
            return res.json(updatedInfo[1][0]);
        }
     }
}));

module.exports = router;