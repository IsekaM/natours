// Required modules
const express = require('express');
const toursController = require('../controllers/toursController');
const router = express.Router();

// Middleware
router.param('id', toursController.api.checkID);

// Routes
router
  .route('/:id')
  .get(toursController.api.getID)
  .patch(toursController.api.patch)
  .delete(toursController.api.delete);

router
  .route('/')
  .get(toursController.api.getAll)
  .post(toursController.api.checkBody, toursController.api.post);

module.exports = router;
