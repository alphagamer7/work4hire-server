// Libraries
const express = require('express');
const ratingController = require('../controllers/rating');

// Router
const ratingRouter = express.Router();

// Create rating : POST
ratingRouter.post('/', ratingController.createRating);

// Read rating : GET
ratingRouter.get('/:id', ratingController.getRating);
ratingRouter.get('/', ratingController.getRatings);

// Update rating : PUT
ratingRouter.put('/:id', ratingController.updateRating);

// Delete rating : DELETE
ratingRouter.delete('/:id', ratingController.deleteRating);

module.exports = ratingRouter;
