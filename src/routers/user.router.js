const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', auth, userController.getAllUsers);
router.post('/', rescue(userController.create));

module.exports = router;
