const fs = require('fs');
const path = require('path');
const multer = require('multer');
const logger = require('../utils/logger');
const filenameCreator = require('../utils/filename_creator');
const Images = require('../models/images');

// Storage Configuation for upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'upload', 'images'));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileNameStr = filenameCreator() + extension;
    req.imageName = fileNameStr;
    cb(null, fileNameStr);
  },
});

// Multer Object for file upload
const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');

exports.createImage = async (req, res) => {
  const data = {
    ...req.body,
    images_filename: req.imageName,
  };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    const createdImages = await Images.create({ ...data });
    if (createdImages) {
      return res.status(201).json({
        createdImages: createdImages,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Images.controller (createImage)',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getImage = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const image = await Images.findByPk(id);
      if (image) {
        return res.status(200).json(
          image.get({
            plain: true,
          })
        );
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Images.controller (getImage):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getImages = async (req, res) => {
  // Query Variable
  const query = req.query;

  try {
    // Find by observation
    if (query.observation) {
      const images = await Images.findAll({
        where: {
          id_observation: query.observation,
        },
        limit: +query.limit || 10,
      });

      return res.status(200).json({
        images: images,
      });
    }

    // Show All to a limit
    const images = await Images.findAll({
      limit: +query.limit || 10,
    });

    return res.status(200).json(images);
  } catch (err) {
    logger.error({
      message: 'Error on Images.controller (getImages):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateImage = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    const updatedRows = await Images.update(
      { ...data },
      {
        where: {
          id_images: id,
        },
      }
    );
    // Get updated
    const updatedImage = await Images.findOne({
      where: {
        id_images: id,
      },
    });

    if (updatedImage) {
      // Send the user to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        image: updatedImage.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Images.controller (updateImage):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteImage = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    const deletedImage = await Images.findOne({ where: { id_images: id } });

    if (deletedImage) {
      fs.unlink(
        path.join(
          __dirname,
          '..',
          'upload',
          'images',
          deletedImage.images_filename
        ),
        async (err) => {
          if (err) {
            logger.error({
              message:
                'There was a problem deleting the image on images.controller.deleteImage function',
              error: err,
            });
            return res.status(500).json({ err, message: err.toString() });
          }

          const destroyVar = await Images.destroy({ where: { id_images: id } });
          return res.status(200).json({
            deleted: destroyVar ? true : false,
            deletedImage: deletedImage.get({ plain: true }),
          });
        }
      );
    } else {
      res.status(404).json({ error: 'data not found' });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Images.controller (deleteImage): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
