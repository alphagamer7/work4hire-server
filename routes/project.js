// Libraries
const express = require('express');
const projectController = require('../controllers/project');

// Router
const projectRouter = express.Router();

// Create project : POST
projectRouter.post('/', projectController.createProject);

// Read project : GET
projectRouter.get('/:id', projectController.getProject);
projectRouter.get('/', projectController.getProjects);

// Update project : PUT
projectRouter.put('/:id', projectController.updateProject);

// Delete project : DELETE
projectRouter.delete('/:id', projectController.deleteProject);

//firebase
projectRouter.post('/add', projectController.createFirebaseProject);

projectRouter.post('/all', projectController.getProjectList);


module.exports = projectRouter;
