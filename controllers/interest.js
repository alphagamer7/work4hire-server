const logger = require('../utils/logger');
const Interest = require('../models/interest');

exports.createInterest = async (req, res) => {
  // Make a copy of the new client
  let data = { ...req.body };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createdInterest = await Interest.create({
      ...data,
    });

    if (createdInterest) {
      // Send Response to client
      res.status(201).json({
        createdInterest: createdInterest,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Interest.controller (createInterest):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getInterest = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const interest = await Interest.findByPk(id);
      if (interest) {
        return res.status(200).json(interest.get({ plain: true }));
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Interest.controller (readInterest):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getInterests = async (req, res) => {
  // Query Variable
  const query = req.query;
  const limit = +query.limit;

  try {
    // Find by projectId
    if (query.projectId) {
      const interests = await Interest.findAll({
        where: {
          projectId: query.projectId,
        },
        limit: limit || 10,
      });

      return res.status(200).json({
        interests: interests,
      });
    }
    if (query.workerId) {
      // Find by workerId

      const interests = await Interest.findAll({
        where: {
          workerId: query.workerId,
        },
        limit: limit || 15,
      });

      return res.status(200).json({
        interests: interests,
      });
    }

    if (query.status) {
      // Find by status

      const interests = await Interest.findAll({
        where: {
          status: query.status,
        },
        limit: limit || 15,
      });

      return res.status(200).json({
        interests: interests,
      });
    }

    // Show all Interests to certain limit
    const interests = await Interest.findAll({
      limit: limit || 15,
    });

    res.status(200).json({
      interests: interests,
    });
  } catch (err) {
    logger.error({
      message: 'Error on Interest.controller (readInterests):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateInterest = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update user
    const updatedRows = await Interest.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated user
    const updatedInterest = await Interest.findOne({
      where: {
        id: id,
      },
    });

    if (updatedInterest) {
      // Send the user to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        interest: updatedInterest.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Interest.controller (updateInterest):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteInterest = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const params = {
      where: {
        id: id,
      },
    };

    // Fetch record and then delete
    const deletedInterest = await Interest.findOne({ ...params });

    if (deletedInterest) {
      const destroyVar = await Interest.destroy(params);
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedInterest: deletedInterest.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Interest.controller (deleteInterest): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
