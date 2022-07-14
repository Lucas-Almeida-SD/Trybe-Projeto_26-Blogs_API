const express = require('express');
const auth = require('../middlewares/auth');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', auth, postController.create);

module.exports = router;
