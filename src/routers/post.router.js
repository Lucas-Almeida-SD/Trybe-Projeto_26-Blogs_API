const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.get('/', rescue(auth), rescue(postController.getAllPosts));
router.get('/:id', rescue(auth), rescue(postController.getPostById));
router.post('/', rescue(auth), rescue(postController.create));
router.put('/:id', rescue(auth), rescue(postController.update));
router.delete('/:id', rescue(auth), rescue(postController.exclude));

module.exports = router;
