// Libraries
const express = require('express');
const companyController = require('../controllers/company');

// Router
const companyRouter = express.Router();

// Create documents : POST
companyRouter.post('/', companyController.createCompany);

// Read documents : GET
companyRouter.get('/:id', companyController.getCompany);
companyRouter.get('/', companyController.getCompanies);

// Update documents : PUT
companyRouter.put('/:id', companyController.updateCompany);

// Delete documents : DELETE
companyRouter.delete('/:id', companyController.deleteCompany);

module.exports = companyRouter;
