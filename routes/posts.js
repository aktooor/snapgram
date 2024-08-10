const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      user: req.user.id,
    });

    newPost.save().then(post => res.json(post));
  }
);

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

module.exports = router;
