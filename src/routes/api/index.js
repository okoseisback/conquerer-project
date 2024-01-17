const express = require('express');
const authRoutes = require('./auth');
const categoryRoutes = require('./categories');
const postRoutes = require('./posts');
const tagRoutes = require('./tags');
const commentRoutes = require('./comments');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('api.index', { title: 'Conquerer API v0.0.1' });
});

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
