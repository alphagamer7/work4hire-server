const logger = require('../utils/logger');
const Company = require('../models/company');

exports.createCompany = async (req, res) => {
  const data = req.body;

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    const createdCompany = await Company.create({ ...data });
    if (createdCompany) {
      return res.status(201).json({
        createdCompany: createdCompany,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Company.controller (createCompany)',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getCompany = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const company = await Company.findByPk(id);
      if (company) {
        return res.status(200).json(
          company.get({
            plain: true,
          })
        );
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Company.controller (getCompany):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getCompanies = async (req, res) => {
  // Query Variable
  const query = req.query;

  try {
    // Find by vat
    if (query.vatnum) {
      const company = await Company.findOne({
        where: {
          vatnum: query.vatnum,
        },
        order: [['createdAt', 'DESC']],
      });
      if (company) return res.status(200).json(company);

      return res.status(404).json({ error: 'data not found' });
    }

    if (query.email) {
      const company = await Company.findAll({
        where: {
          company_email: query.email,
        },
        limit: +query.limit || 10,
      });
      if (company) return res.status(200).json(company);

      return res.status(404).json({ error: 'data not found' });
    }

    // Find by Phone
    if (query.phone) {
      const company = await Company.findAll({
        where: {
          company_phone: query.phone,
        },
        limit: +query.limit || 10,
      });
      if (company) return res.status(200).json(company);

      return res.status(404).json({ error: 'data not found' });
    }

    // Find by distance

    if (query.distance) {
      const company = await Company.findAll({
        where: {
          rank: {
            [Op.or]: {
              [Op.lte]: query.distance,
            },
          },
          limit: +query.limit || 10,
        },
      });
      if (company) return res.status(200).json(company);

      return res.status(404).json({ error: 'data not found' });
    }

    //find by user id
    if (query.uid) {
      const company = await Company.findOne({
        where: {
          uid: query.uid,
        },
      });
      if (company) return res.status(200).json(company);

      return res.status(404).json({ error: 'data not found' });
    }

    // Show All to a limit
    const companies = await Company.findAll({
      limit: +query.limit || 10,
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(companies);
  } catch (err) {
    logger.error({
      message: 'Error on Company.controller (getCompanies):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateCompany = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update user
    const updatedRows = await Company.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated user
    const updatedCompany = await Company.findOne({
      where: {
        id: id,
      },
    });

    if (updatedCompany) {
      // Send the user to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        company: updatedCompany.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Company.controller (updateCompany):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteCompany = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const deletedCompany = await Company.findOne({ where: { id_company: id } });
    const destroyVar = await Company.destroy({ where: { id_company: id } });

    if (deletedCompany) {
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedCompany: deletedCompany.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Company.controller (deleteCompany): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
