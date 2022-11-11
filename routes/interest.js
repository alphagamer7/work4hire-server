// Libraries
const express = require('express');
const interestController = require('../controllers/interest');

// Router
const interestRouter = express.Router();

// Create effectiveControls : POST
interestRouter.post('/', interestController.createInterest);

// Read effectiveControls : GET
interestRouter.get('/:id', interestController.getInterest);
interestRouter.get('/', interestController.getInterests);

// Update effectiveControls : PUT
interestRouter.put('/:id', interestController.updateInterest);

// Delete effectiveControls : DELETE
interestRouter.delete('/:id', interestController.deleteInterest);

module.exports = interestRouter;
