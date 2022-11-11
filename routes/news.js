// Libraries
const express = require('express');
const newsController = require('../controllers/news');

// Router
const newsRouter = express.Router();

// Create Employee : POST
newsRouter.post('/', newsController.createNews);

// Read Employee : GET
newsRouter.get('/:id', newsController.getOneNews);
newsRouter.get('/', newsController.getNews);

// Update Employee : PUT
newsRouter.put('/:id', newsController.updateNews);

// Delete Employee : DELETE
newsRouter.delete('/:id', newsController.deleteNews);

module.exports = newsRouter;
