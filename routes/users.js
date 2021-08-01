'use strict';

const express = require('express');
const models = require('../models');
const asynchandler = require('../middleware/async-handler');

const router = express.Router();
const { User } = models;
const SQUELIZE_ERROR = 'SequelizeValidationError';
/**
 * / Router used to dsiplay friendly message
 */
router.get('/', asynchandler(async (req, res) => {
  // console.dir(models);
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  res.json(users);
}));
router.post('/', asynchandler(async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    const { name, errors } = error;
    if (name === SQUELIZE_ERROR) {
      res.status(400);
      res.send(errors);
    } else {
      throw error;
    }
  }
}));

module.exports = router;
