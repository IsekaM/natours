// Required modules
const express = require('express');
const toursController = require('../controllers/toursController');
const router = express.Router();

// Routes
router
  .route('/:id')
  .get(toursController.api.getID)
  .patch(toursController.api.patch)
  .delete(toursController.api.delete);

module.exports = router;
