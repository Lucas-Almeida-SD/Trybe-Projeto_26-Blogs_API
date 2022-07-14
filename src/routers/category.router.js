const express = require('express');
const auth = require('../middlewares/auth');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.post('/', auth, categoryController.create);

module.exports = router;
