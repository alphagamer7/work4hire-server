// Libraries
const express = require('express');
const workerProfessionController = require('../controllers/workerprofession');
const isAuthenticated = require('../middleware/validate_auth');

// Router
const workerProfessionRouter = express.Router();

// Create LoginLog : POST
// loginLogRouter.post('/', loginLogController.createLoginLog);

// Read LoginLog : GET
// loginLogRouter.get('/:id', loginLogController.readLoginLog);
// loginLogRouter.get('/', loginLogController.readLoginLogs);

// Delete LoginLog : DELETE
// loginLogRouter.delete('/:id', loginLogController.deleteLoginLogs);

module.exports = workerProfessionRouter;