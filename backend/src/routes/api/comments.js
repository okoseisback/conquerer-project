const { Router } = require('express');
const { commentControllers } = require('../../controllers/api');
const auth = require('../../middlewares/auth');

const router = Router();

router.route('/').post(auth(), commentControllers.addComment);

module.exports = router;
