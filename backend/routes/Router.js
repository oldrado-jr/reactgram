const express = require('express');
const router = express();

const logErrors = require('../middlewares/logErrors');
const castErrorHandler = require('../middlewares/castErrorHandler');
const errorHandler = require('../middlewares/errorHandler');

router.use('/api/users', require('./UserRoutes'));
router.use('/api/photos', require('./PhotoRoutes'));

router.use(logErrors);
router.use(castErrorHandler);
router.use(errorHandler);

module.exports = router;
