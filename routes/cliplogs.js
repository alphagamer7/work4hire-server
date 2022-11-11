// Libraries
const express = require('express');
const clipLogsController = require('../controllers/cliplogs');
const isAuthenticated = require('../middleware/validate_auth');

// Router
const clipLogsRouter = express.Router();

// Create Client : POST
clipLogsRouter.post('/', clipLogsController.createClipLogs);

// Read Client : GET
clipLogsRouter.get('/:id', clipLogsController.getClipLog);
clipLogsRouter.get('/', clipLogsController.getClipLogs);

// Update Client : PUT
clipLogsRouter.put('/:id', clipLogsController.updateClipLog);

// Delete Client : DELETE
clipLogsRouter.delete('/:id', clipLogsController.deleteClipLog);

module.exports = clipLogsRouter;
