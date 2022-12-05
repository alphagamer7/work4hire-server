// Libraries
const express = require('express');
const rootRouter = express.Router();

// Middleware
const isAuthenticated = require('../middleware/validate_auth');

// Routers Import
// const authRoute = require('./auth');
// const addressRoute = require('./address');
// const newsRoute = require('./news');
// const workerProfessionRoute = require('./workerprofession');
// const companyProfessionRoute = require('./companyprofession');
// const clipLogsRoute = require('./cliplogs');
// const ratingRoute = require('./rating');
// const clipPriceListRoute = require('./clippricelist');
// const professionRoute = require('./profession');
const userRoute = require('./user');
const projectRoute = require('./project');
// const interestRoute = require('./interest');
// const workerRoute = require('./worker');
// const companyRoute = require('./company');
// const certificateRoute = require('./certificate');

// Routes
// rootRouter.use('/auth', authRoute);
// rootRouter.use('/address', addressRoute);
// rootRouter.use('/news', newsRoute);
// rootRouter.use('/workerprofession', workerProfessionRoute);
// rootRouter.use('/companyprofession', companyProfessionRoute);
// rootRouter.use('/cliplogs', clipLogsRoute);
// rootRouter.use('/rating', ratingRoute);
// rootRouter.use('/clippricelist', clipPriceListRoute);
// rootRouter.use('/profession', professionRoute);
rootRouter.use('/user', userRoute);
rootRouter.use('/project', projectRoute);
// rootRouter.use('/interest', interestRoute);
// rootRouter.use('/worker', workerRoute);
// rootRouter.use('/company', companyRoute);
// rootRouter.use('/certificate', certificateRoute);

module.exports = rootRouter;
