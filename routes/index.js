'use strict';

const express = require('express');

const router = express.Router();
/**
 * / Router used to dsiplay friendly message
 */
router.get('/', (req, res) => {
  res.send({ message: 'Welcome to the REST API project!' });
});

module.exports = router;
