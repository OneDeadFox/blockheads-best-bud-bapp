const express = require(`express`);
const router = express.Router();

// const friendRoute = require(`./friendController`);
// router.use(`api/friends`, friendRoute);

const reactionRoute = require(`./reactionController`);
router.use(`/api/reactions`, reactionRoute);

const thoughtRoute = require(`./thoughtController`);
router.use(`/api/thoughts`, thoughtRoute);

const userRoute = require(`./userController`);
router.use(`/api/users`, userRoute);

module.exports = router;

