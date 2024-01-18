const { Router } = require('express');
const { postControllers } = require('../../controllers/api');
const auth = require('../../middlewares/auth');

const router = Router();

router.route('/').get(postControllers.getPosts).post(auth(), postControllers.addPosts);

// router.route('/:id').get(postControllers.getPostsById);
router.route('/:slug').get(postControllers.getPostsBySlug);
router.route('/user/:id').get(postControllers.getPostsByUserId);

router.route('/del/:id').delete(postControllers.delPostById);

module.exports = router;
