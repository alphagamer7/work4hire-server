const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Certificate = require('../models/certificate');
const filenameCreator = require('../utils/filename_creator');
const logger = require('../utils/logger');

// Storage Configuration for upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'upload', 'certificates'));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileNameStr = filenameCreator() + extension;
    req.certificateFilename = fileNameStr;
    req.certificateExt = extension.replace('.', '');
    cb(null, fileNameStr);
  },
});

// Multer Object for file upload
const upload = multer({ storage: storage });

exports.uploadCertificate = upload.single('certificate');

exports.createCertificate = async (req, res) => {
  // Make a copy of the req.body
  let data = {
    ...req.body,
    certificate_filename: req.certificateFilename,
    certificate_type: req.certificateExt,
  };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createdCertificate = await Certificate.create({
      ...data,
    });

    if (createdCertificate) {
      // Send Response to client
      res.status(201).json({
        createdCertificate: createdCertificate,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Certificate.controller (createCertificate):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getCertificate = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const Certificate = await Certificate.findByPk(id);
      if (Certificate) {
        return res.status(200).json(Certificate.get({ plain: true }));
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Certificate.controller (readCertificate):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getCertificates = async (req, res) => {
  // Query Variable
  const query = req.query;
  const limit = +query.limit;

  try {
    // Find all Certificate by workerId
    if (query.workerId) {
      const certificates = Certificate.findAll({
        where: {
          workerId: query.workerId,
        },
        limit: limit || 10,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        certificates: certificates,
      });
    }

    // Find all Certificate by Company
    if (query.company) {
      const certificates = Certificate.findAll({
        where: {
          workerId: query.company,
        },
        limit: limit || 10,
      });

      return res.status(200).json({
        certificates: certificates,
      });
    }

    // Find all Certificate by type
    if (query.type) {
      const certificates = Certificate.findAll({
        where: {
          type: query.type,
        },
        limit: limit || 10,
      });

      return res.status(200).json({
        certificates: certificates,
      });
    }

    // Show all certificates to certain limit
    const certificates = await Certificate.findAll({
      limit: limit || 10,
    });

    res.status(200).json({
      certificates: certificates,
    });
  } catch (err) {
    logger.error({
      message: 'Error on Certificate.controller (readCertificate):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateCertificate = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update
    const updatedRows = await Certificate.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated
    const updatedCertificate = await Certificate.findOne({
      where: {
        id: id,
      },
    });

    if (updatedCertificate) {
      // Send the updated record to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        updatedCertificate: updatedCertificate.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Certificate.controller (updateCertificate):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteCertificate = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const params = {
      where: {
        id: id,
      },
    };

    // Fetch record and then delete
    const deletedCertificate = await Certificate.findOne(params);

    if (deletedCertificate) {
      fs.unlink(
        path.join(
          __dirname,
          '..',
          'upload',
          'certificates',
          deletedCertificate.Certificate_filename
        ),
        async (err) => {
          if (err) {
            logger.error({
              message: 'There was an error deleting the Certificate file',
              error: err,
            });
            return res.status(500).json({ err, message: err.toString() });
          }

          const destroyVar = await Certificate.destroy(params);
          return res.status(200).json({
            deleted: destroyVar ? true : false,
            deletedCertificate: deletedCertificate.get({ plain: true }),
          });
        }
      );
    } else {
      res.status(404).json({ error: 'data not found' });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Certificate.controller (deleteCertificate): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
