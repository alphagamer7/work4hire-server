// Libraries
const express = require('express');
const clipPriceListController = require('../controllers/clippricelist');
const isAuthenticated = require('../middleware/validate_auth');

// Router
const clipPriceListRouter = express.Router();

// Create clipPriceList : POST
clipPriceListRouter.post('/', clipPriceListController.createClipPriceList);

// Read clipPriceList : GET
clipPriceListRouter.get('/:id', clipPriceListController.getClipPriceList);
clipPriceListRouter.get('/', clipPriceListController.getClipPriceLists);

// Update clipPriceList : PUT
clipPriceListRouter.put('/:id', clipPriceListController.updateClipPriceList);

// Delete clipPriceList : DELETE
clipPriceListRouter.delete('/:id', clipPriceListController.deleteClipPriceList);

module.exports = clipPriceListRouter;
