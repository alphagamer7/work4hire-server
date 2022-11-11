const ClipLogs = require('../models/cliplogs');
const logger = require('../utils/logger');

exports.createClipLogs = async (req, res) => {
  // Make a copy of the new ClipLogs
  let data = { ...req.body };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createdClipLogs = await ClipLogs.create({
      ...data,
    });

    if (createdClipLogs) {
      // Send Response to ClipLog
      res.status(201).json({
        createdClipLogs: createdClipLogs,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on createdClipLogs.controller (createClipLogs):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getClipLog = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const log = await ClipLogs.findByPk(id);
      if (log) {
        return res.status(200).json(log.get({ plain: true }));
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on clipLog.controller (readclipLog):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getClipLogs = async (req, res) => {
  // Query Variable
  const query = req.query;
  const limit = +query.limit;

  try {
    // Find by company id
    if (query.companyId) {
      const logs = await ClipLogs.findAll({
        where: {
          companyId: query.companyId,
        },
        order: [['createdAt', 'DESC']],
      });

      if (logs) return res.status(200).json(logs.get({ plain: true }));

      return res.status(404).json({ error: 'data not found' });
    }

    // Find by paymentId
    if (query.paymentId) {
      const logs = await ClipLogs.findOne({
        where: {
          paymentId: query.paymentId,
        },
        order: [['createdAt', 'DESC']],
      });

      if (logs) return res.status(200).json(logs.get({ plain: true }));

      return res.status(404).json({ error: 'data not found' });
    }

    // Show all logs to certain limit
    const logs = await ClipLogs.findAll({
      limit: limit || 10,
    });

    res.status(200).json({
      clipLogs: logs,
    });
  } catch (err) {
    logger.error({
      message: 'Error on ClipLog.controller (readClipLog):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateClipLog = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update user
    const updatedRows = await ClipLogs.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated user
    const updatedClipLog = await ClipLogs.findOne({
      where: {
        id: id,
      },
    });

    if (updatedClipLog) {
      // Send the user to ClipLog
      return res.status(200).json({
        updatedRows: updatedRows[0],
        clipLog: updatedClipLog.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on ClipLog.controller (updateClipLog):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteClipLog = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const params = {
      where: {
        id: id,
      },
    };

    // Fetch record and then delete
    const deletedClipLog = await ClipLogs.findOne({ ...params });

    if (deletedClipLog) {
      const destroyVar = await ClipLogs.destroy(params);
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedClipLog: deletedClipLog.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on clipLog.controller (deletedClipLog): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
