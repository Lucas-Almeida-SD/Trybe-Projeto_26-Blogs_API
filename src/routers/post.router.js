const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.get('/', rescue(auth), rescue(postController.getAllPosts));
router.post('/', rescue(auth), rescue(postController.create));

module.exports = router;
