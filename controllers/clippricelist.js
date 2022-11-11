const logger = require('../utils/logger');
const ClipPriceList = require('../models/clippricelist');

exports.createClipPriceList = async (req, res) => {
  const data = req.body;

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    const createdClipPriceList = await ClipPriceList.create({ ...data });
    if (createdClipPriceList) {
      return res.status(201).json({
        createdClipPriceList: createdClipPriceList,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on ClipPriceList.controller (createClipPriceList)',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getClipPriceList = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const priceList = await ClipPriceList.findByPk(id);
      if (priceList) {
        return res.status(200).json(
          priceList.get({
            plain: true,
          })
        );
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on ClipPriceList.controller (getClipPriceList):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getClipPriceLists = async (req, res) => {
  // Query Variable
  const query = req.query;

  try {
    // Find by adminId
    if (query.adminId) {
      const priceList = await ClipPriceList.findAll({
        where: {
          adminId: query.adminId,
        },
        limit: +query.limit || 10,
      });
      if (priceList) return res.status(200).json(priceList);

      return res.status(404).json({ error: 'data not found' });
    }

    // Find by numOfClips
    if (query.numOfClips) {
      const priceList = await ClipPriceList.findAll({
        where: {
          numOfClips: query.numOfClips,
        },
        limit: +query.limit || 10,
      });
      if (priceList) return res.status(200).json(priceList);

      return res.status(404).json({ error: 'data not found' });
    }

    // Show All to a limit
    const priceList = await ClipPriceList.findAll({
      limit: +query.limit || 10,
    });

    return res.status(200).json(priceList);
  } catch (err) {
    logger.error({
      message: 'Error on ClipPriceList.controller (getClipPriceList):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateClipPriceList = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update ClipPriceList
    const updatedRows = await ClipPriceList.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated ClipPriceList
    const updatedClipPriceList = await ClipPriceList.findOne({
      where: {
        id: id,
      },
    });

    if (updatedClipPriceList) {
      // Send the ClipPriceList to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        updatedClipPriceList: updatedClipPriceList.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on ClipPriceList.controller (updateClipPriceList):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteClipPriceList = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const deletedPriceList = await ClipPriceList.findOne({
      where: { id: id },
    });
    const destroyVar = await ClipPriceList.destroy({
      where: { id: id },
    });

    if (deletedPriceList) {
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedClipPriceList: deletedPriceList.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on ClipPriceList.controller (deleteClipPriceList): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
