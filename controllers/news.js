const logger = require('../utils/logger');
const News = require('../models/news');

exports.createNews = async (req, res) => {
  // Make a copy of the new client
  let data = { ...req.body };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createdNews = await News.create({
      ...data,
    });

    if (createdNews) {
      // Send Response to client
      res.status(201).json({
        news: createdNews,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on news.controller (createNews):',
      error: err,
    });
    return res.status(500).json({ err: err, message: err.toString() });
  }
};

exports.getOneNews = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const news = await News.findByPk(id);
      if (news) {
        return res.status(200).json(news.get({ plain: true }));
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on News.controller (getNews):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getNews = async (req, res) => {
  // Query Variable
  const query = req.query;
  const limit = +query.limit;

  try {
    // Find by title
    if (query.title) {
      const news = await News.findAll({
        where: {
          title: query.title,
        },
        limit: limit || 10,
      });

      return res.status(200).json({
        news: news,
      });
    }

    // Find by company
    if (query.group) {
      const news = await News.findAll({
        where: {
          group: query.group,
        },
        limit: limit || 10,
      });

      return res.status(200).json({
        news: news,
      });
    }

    // Show all client to certain limit
    const news = await News.findAll({
      limit: limit || 10,
    });

    res.status(200).json({
      news: news,
    });
  } catch (err) {
    logger.error({
      message: 'Error on News.controller (getNews):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateNews = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update user
    const updatedRows = await News.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated user
    const updatedNews = await News.findOne({
      where: {
        id: id,
      },
    });

    if (updatedNews) {
      // Send the user to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        News: updatedNews.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on News.controller (updateNews):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteNews = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const params = {
      where: {
        id: id,
      },
    };

    // Fetch record and then delete
    const deletedNews = await News.findOne({ ...params });

    if (deletedNews) {
      const destroyVar = await deletedNews.destroy(params);
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedNews: deletedNews.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on News.controller (deleteNews): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};
