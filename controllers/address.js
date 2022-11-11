const Address = require('../models/address');
const logger = require('../utils/logger');

exports.createAddress = async (req, res) => {
  const data = req.body;

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    const address = await Address.create({ ...data });
    if (address) {
      return res.status(201).json({
        address: address,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Address.controller (address)',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getAddress = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const address = await Address.findByPk(id);
      if (address) {
        return res.status(200).json(
          address.get({
            plain: true,
          })
        );
      }
    }

    // Find By uid
    if (query.uid) {
      const address = await Address.findOne({
        where: {
          uid: query.uid,
        },
      });
      if (address)
        return res.status(200).json(
          address.get({
            plain: true,
          })
        );

      return res.status(404).json({ error: 'data not found' });
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Address.controller (getAddress):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getAddresses = async (req, res) => {
  // Query Variable
  const query = req.query;

  try {
    if (query.city) {
      const address = await Address.findAll({
        where: {
          city: query.city,
        },
        limit: +query.limit || 10,
      });
      if (address) return res.status(200).json(address);

      return res.status(404).json({ error: 'data not found' });
    }

    // Find by Phone
    if (query.type) {
      const address = await Address.findAll({
        where: {
          type: query.type,
        },
        limit: +query.limit || 10,
      });
      if (address) return res.status(200).json(address);

      return res.status(404).json({ error: 'data not found' });
    }

    // Show All to a limit
    const address = await Address.findAll({
      limit: +query.limit || 10,
    });

    return res.status(200).json(address);
  } catch (err) {
    logger.error({
      message: 'Error on Address.controller (getAddresses):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateAddress = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update address
    const updatedRows = await Address.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated address
    const updatedAddress = await Address.findOne({
      where: {
        id: id,
      },
    });

    if (updatedAddress) {
      // Send the user to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        address: updatedAddress.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Address.controller (updateAddress):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteAddress = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const deletedAddress = await Address.findOne({ where: { id: id } });
    const destroyVar = await Address.destroy({ where: { id: id } });

    if (deletedAddress) {
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedAddress: deletedAddress.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Address.controller (deleteAddress): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
