const express = require('express');
const authRoutes = require('./auth');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('api.index', { title: 'Conquerer API v0.0.1' });
});

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
