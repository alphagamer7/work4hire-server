// Libraries
const express = require('express');
const userController = require('../controllers/user');

// Router
const userRouter = express.Router();

// Create user : POST
userRouter.post('/', userController.createUser);

// // Read user : GET
// userRouter.get('/:id', userController.getUser);
// userRouter.get('/', userController.getUsers);

// // Update user : PUT
// userRouter.put('/:id', userController.updateUser);

// // Delete user : DELETE
// userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
