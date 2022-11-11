// Libraries
const express = require('express');
const addressController = require('../controllers/address');
const isAuthenticated = require('../middleware/validate_auth');

// Router
const addressRoute = express.Router();

// Create : POST
addressRoute.post('/', addressController.createAddress);

//Read : GET
addressRoute.get('/:id', addressController.getAddress);
addressRoute.get('/', addressController.getAddresses);

//Update : PUT
addressRoute.put('/:id', addressController.updateAddress);

//Delete : DELETE
addressRoute.delete('/:id', addressController.deleteAddress);

module.exports = addressRoute;
