'use strict';

const express = require('express');
const models = require('../models');
const authenticate = require('../middleware/authenticate');
const asynchandler = require('../middleware/async-handler');

const router = express.Router();
const { User } = models;
const SQUELIZE_ERROR_VALIDATION = 'SequelizeValidationError';
const SQUELIZE_ERROR_CONSTRAIN = 'SequelizeUniqueConstraintError';
/**
 * get all users of the form:
 * [{
        "id": num,
        "firstName": "firstName",
        "lastName": "lastName",
        "emailAddress": "firstName@example.com"
    },..]
 */
router.get('/', authenticate, asynchandler(async (req, res) => {
  const user = req.currentUser;
  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
  });
}));
/**
 * Post: Create a new users without authentication
 */
router.post('/', asynchandler(async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.set('Location', '/');
    res.status(201).end();
  } catch (error) {
    const { name, errors } = error;
    // check if request has missing infomation or voilates unique key constrain
    if (name === SQUELIZE_ERROR_VALIDATION || name === SQUELIZE_ERROR_CONSTRAIN) {
      res.status(400);
      res.send(errors);
    } else {
      throw errors;
    }
  }
}));

module.exports = router;
