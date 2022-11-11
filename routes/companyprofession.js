// Libraries
const express = require('express');
const isAuthenticated = require('../middleware/validate_auth');
const companyProfessionController = require('../controllers/companyprofession');

// Router
const CompanyProfessionRouter = express.Router();

// Create LoginLog : POST
// loginLogRouter.post('/', loginLogController.createLoginLog);

// Read LoginLog : GET
// loginLogRouter.get('/:id', loginLogController.readLoginLog);
// loginLogRouter.get('/', loginLogController.readLoginLogs);

// Delete LoginLog : DELETE
// loginLogRouter.delete('/:id', loginLogController.deleteLoginLogs);

module.exports = CompanyProfessionRouter;
