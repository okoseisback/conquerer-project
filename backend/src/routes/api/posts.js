const { Router } = require('express');
const { postControllers } = require('../../controllers/api');
const auth = require('../../middlewares/auth');

const router = Router();

router.route('/').get(postControllers.getPosts).post(auth(), postControllers.addPosts);
router.route('/upd/:id').post(auth(), postControllers.updatePost);
router.route('/id/:id').get(postControllers.getPostsById);
router.route('/my').get(auth(), postControllers.getPostsByMy); 
router.route('/last').get(postControllers.getPostsByLast);
router.route('/del/:id').post(auth(), postControllers.delPostById);

module.exports = router;
