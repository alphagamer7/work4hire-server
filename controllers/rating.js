const logger = require('../utils/logger');
const Rating = require('../models/rating');

exports.createRating = async (req, res) => {
  // Make a copy of the new rating
  let data = { ...req.body };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createdRating = await Rating.create({
      ...data,
    });

    if (createdRating) {
      // Send Response to rating
      res.status(201).json({
        createdRating: createdRating,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Rating.controller (createRating):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getRating = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const rating = await Rating.findByPk(id);
      if (rating) {
        return res.status(200).json(rating.get({ plain: true }));
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Rating.controller (readRating):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getRatings = async (req, res) => {
  // Query Variable
  const query = req.query;
  const limit = +query.limit;

  try {
    // Find by projectId
    if (query.projectId) {
      const ratings = await Rating.findAll({
        where: {
          projectId: query.projectId,
        },
        limit: limit || 10,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        ratings: ratings,
      });
    }
    //get by workerId
    if (query.workerId) {
      const { count, ratings } = await Rating.findAndCountAll({
        where: {
          workerId: query.workerId,
        },
        limit: limit || 10,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        ratings: ratings,
        totalRating: count,
      });
    }
    //get by companyId
    if (query.companyId) {
      const { count, ratings } = await Rating.findAll({
        where: {
          companyId: query.companyId,
        },
        limit: limit || 10,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        ratings: ratings,
        totalRating: count,
      });
    }

    //get by uid
    if (query.uid) {
      const ratings = await Rating.findAll({
        where: {
          uid: query.uid,
        },
        limit: limit || 10,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        ratings: ratings,
      });
    }

    // Find by ratingValue
    if (query.rating) {
      const ratings = await Rating.findAll({
        where: {
          rating: query.rating,
        },
        limit: limit || 15,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        ratings: ratings,
      });
    }

    // Find by type
    if (query.type) {
      const ratings = await Rating.findAll({
        where: {
          type: query.type,
        },
        limit: limit || 15,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        ratings: ratings,
      });
    }

    // Show all rating to certain limit
    const ratings = await Rating.findAll({
      limit: limit || 20,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      ratings: ratings,
    });
  } catch (err) {
    logger.error({
      message: 'Error on Ratings.controller (readRatings):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateRating = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update rating
    const updatedRows = await Rating.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated rating
    const updatedRating = await Rating.findOne({
      where: {
        id: id,
      },
    });

    if (updatedRating) {
      // Send the user to rating
      return res.status(200).json({
        updatedRows: updatedRows[0],
        Rating: updatedRating.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Rating.controller (updateRating):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteRating = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const params = {
      where: {
        id: id,
      },
    };

    // Fetch record and then delete
    const deletedRating = await Rating.findOne({ ...params });

    if (deletedRating) {
      const destroyVar = await deletedRating.destroy(params);
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedRating: deletedRating.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Rating.controller (deleteRating): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
