const logger = require('../utils/logger');
const Worker = require('../models/worker');

exports.createWorker = async (req, res) => {
  // Make a copy of the req.body
  let data = { ...req.body };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createWorker = await Worker.create({
      ...data,
    });

    if (createWorker) {
      // Send Response to client
      res.status(201).json({
        worker: createWorker,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on createWorker.controller (createWorker):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getWorker = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    // Find By Id
    if (id !== null) {
      const readWorker = await Worker.findByPk(id);

      if (readWorker) {
        return res.status(200).json(readWorker.get({ plain: true }));
      }
    }
    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on readWorker.controller (readWorker):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getAllWorkers = async (req, res) => {
  // Query Variable
  const query = req.query;
  const limit = +query.limit;

  try {
    // Find by Joint company
    if (query.joint_inspection) {
      const allWorkers = await Worker.findAll({
        where: {
          companyId: query.companyId,
        },
        limit: limit || 10,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        workers: allWorkers,
      });
    }

    // Find by Questionnaire
    // if (query.questionnaire) {
    //   const jointInspectionQuestionnaires =
    //     await JointInspectionQuestionnaire.findAll({
    //       where: {
    //         id_questionnaire: query.questionnaire,
    //       },
    //       limit: limit || 10,
    //     });

    //   return res.status(200).json({
    //     jointInspectionQuestionnaires: jointInspectionQuestionnaires,
    //   });
    // }

    // Show all workers to certain limit
    const workers = await Worker.findAll({
      limit: limit || 10,
    });

    res.status(200).json({
      workers: workers,
    });
  } catch (err) {
    logger.error({
      message: 'Error on readAllWorkers.controller (readAllWorkers):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateWorker = async (req, res) => {
  // Params
  const workerId = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update worker
    const updatedRows = await Worker.update(
      { ...data },
      {
        where: {
          id: workerId,
        },
      }
    );

    // Get updated worker
    const updatedWorker = await Worker.findOne({
      where: {
        id: workerId,
      },
    });

    if (updatedWorker) {
      // Send the update  worker data  to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        updatedWorker: updatedWorker.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on updateWorker.controller (updateWorker):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteWorker = async (req, res) => {
  // Params
  const workerId = req.params.id;
  try {
    const params = {
      where: {
        id: workerId,
      },
    };

    // Fetch record and then delete
    const deletedWorker = await Worker.findOne({ ...params });

    if (deletedWorker) {
      const destroyVar = await Worker.destroy(params);
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedWorker: deletedWorker.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on deletedWorker.controller (deletedWorker): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
