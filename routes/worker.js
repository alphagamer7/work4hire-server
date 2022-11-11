// Libraries
const express = require('express');
const workerController = require('../controllers/worker');

// Router
const workerRouter = express.Router();

// Create worker : POST
workerRouter.post('/', workerController.createWorker);

// Read worker : GET
workerRouter.get('/:id', workerController.getWorker);
workerRouter.get('/', workerController.getAllWorkers);

// Update worker : PUT
workerRouter.put('/:id', workerController.updateWorker);

// Delete worker : DELETE
workerRouter.delete('/:id', workerController.deleteWorker);

module.exports = workerRouter;
