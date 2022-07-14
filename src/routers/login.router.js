const express = require('express');
const rescue = require('express-rescue');
const loginController = require('../controllers/login.controller');

const router = express.Router();

router.post('/', rescue(loginController.getToken));

module.exports = router;
