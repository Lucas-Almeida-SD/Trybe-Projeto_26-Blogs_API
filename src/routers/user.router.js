const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', rescue(auth), rescue(userController.getAllUsers));
router.get('/:id', rescue(auth), rescue(userController.getUserById));
router.post('/', rescue(userController.create));
router.delete('/me', rescue(auth), rescue(userController.exclude));

module.exports = router;
