// Libraries
const express = require('express');
const certificateController = require('../controllers/certificate');
const isAuthenticated = require('../middleware/validate_auth');

// Router
const certificateRouter = express.Router();

// Create certificate : POST
certificateRouter.post(
  '/',
  certificateController.uploadCertificate,
  certificateController.createCertificate
);

// Read certificate : GET
certificateRouter.get('/:id', certificateController.getCertificate);
certificateRouter.get('/', certificateController.getCertificates);

// Update certificate : PUT
certificateRouter.put('/:id', certificateController.updateCertificate);

// Delete certificate : DELETE
certificateRouter.delete('/:id', certificateController.deleteCertificate);

module.exports = certificateRouter;
