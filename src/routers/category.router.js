const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.get('/', rescue(auth), rescue(categoryController.getAllCategories));
router.post('/', rescue(auth), rescue(categoryController.create));

module.exports = router;
