const express = require('express');
const auth = require('../middlewares/auth');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.get('/', auth, categoryController.getAllCategories);
router.post('/', auth, categoryController.create);

module.exports = router;
