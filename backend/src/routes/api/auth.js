const express = require('express');
const { userControllers } = require('../../controllers/api');
const validates = require('../../middlewares/validates');
const { userValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/register', validates(userValidation.register), userControllers.register);
router.post('/update/user', auth(), userControllers.update);
router.post('/update/user/password', auth(), userControllers.updatePassword);
router.get('/user', auth(), userControllers.get);

router.post('/login', validates(userValidation.login), userControllers.login);
router.post('/refresh-token', userControllers.refreshToken);
router.post('/logout', userControllers.logout);

module.exports = router;