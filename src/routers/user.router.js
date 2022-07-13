const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', rescue(userController.create));

module.exports = router;
