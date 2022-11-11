const logger = require('../utils/logger');
const Profession = require('../models/profession');

exports.createProfession = async (req, res) => {
  // Make a copy of the new client
  let data = { ...req.body };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createdProfession = await Profession.create({
      ...data,
    });

    if (createdProfession) {
      // Send Response to client
      res.status(201).json({
        createdProfession: createdProfession,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Profession.controller (createProfession):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getProfession = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const profession = await Profession.findByPk(id);
      if (Profession) {
        return res.status(200).json(profession.get({ plain: true }));
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Profession.controller (readProfession):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getProfessions = async (req, res) => {
  // Query Variable
  const query = req.query;
  const limit = +query.limit;

  try {
    // Find by profession name
    if (query.name) {
      const professions = await Profession.findAll({
        where: {
          name: query.name,
        },
        limit: limit || 10,
      });

      return res.status(200).json({
        professions: professions,
      });
    }

    // Show all client to certain limit
    const professions = await Profession.findAll({
      limit: limit || 10,
    });

    res.status(200).json({
      professions: professions,
    });
  } catch (err) {
    logger.error({
      message: 'Error on Professions.controller (readProfessions):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateProfession = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update user
    const updatedRows = await Profession.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated user
    const updatedProfession = await Profession.findOne({
      where: {
        id: id,
      },
    });

    if (updatedProfession) {
      // Send the user to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        Profession: updatedProfession.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Profession.controller (updateProfession):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteProfession = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const params = {
      where: {
        id: id,
      },
    };

    // Fetch record and then delete
    const deletedProfession = await Profession.findOne({ ...params });

    if (deletedProfession) {
      const destroyVar = await deletedProfession.destroy(params);
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedProfession: deletedProfession.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Profession.controller (deleteProfession): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
