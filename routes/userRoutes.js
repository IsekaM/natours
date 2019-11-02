const express = require('express');
const router = express.Router();
usersController = require('../controllers/usersController');

router
  .route('/')
  .get(usersController.api.getAll)
  .post(usersController.api.post);

router
  .route(':id')
  .get(usersController.api.getID)
  .patch(usersController.api.patch)
  .delete(usersController.api.delete);

module.exports = router;
