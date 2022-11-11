// Libraries
const express = require('express');
const professionController = require('../controllers/profession');

// Router
const professionRouter = express.Router();

// Create Profession : POST
professionRouter.post('/', professionController.createProfession);

// Read Profession : GET
professionRouter.get('/:id', professionController.getProfession);
professionRouter.get('/', professionController.getProfessions);

// Update Profession : PUT
professionRouter.put('/:id', professionController.updateProfession);

// Delete Profession : DELETE
professionRouter.delete('/:id', professionController.deleteProfession);

module.exports = professionRouter;
