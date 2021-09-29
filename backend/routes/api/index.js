const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const albumsRouter = require('./albums');
const songsRouter = require('./songs');
const artistsRouter = require('./artists');
const albumCreditsRouter = require('./albumCredits');
const asyncHandler = require('express-async-handler');
const {setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const {User} = require('../../db/models');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/albums', albumsRouter);
router.use('/songs', songsRouter);
router.use('/artists', artistsRouter);
router.use('/albumCredits', albumCreditsRouter);


// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//     const user = await User.findOne({where: {username: 'John Doe'}});
//     setTokenCookie(res, user);
//     return res.json({user});
// }));

// router.get('/restore-user', restoreUser, (req, res) => res.json(req.user));

// router.get('/require-auth', requireAuth, (req, res) => res.json(req.user));

// router.post('/test', (req, res) => res.json({requestBody: req.body}));

module.exports = router;