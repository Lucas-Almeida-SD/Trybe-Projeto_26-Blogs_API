const express = require('express');
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', userController.create);

module.exports = router;
