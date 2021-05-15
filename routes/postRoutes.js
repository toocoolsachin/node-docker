const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const protect = require('../middlewares/authMiddleware');

// localhost:3000/
router
  .route('/')
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);

// localhost:3000/:id
router
  .route('/:id')
  .get(postController.getOnePost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
