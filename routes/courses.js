'use strict';

const express = require('express');
const models = require('../models');
const authenticate = require('../middleware/authenticate');
const asynchandler = require('../middleware/async-handler');

const router = express.Router();
const { User, Course } = models;
const SQUELIZE_ERROR = 'SequelizeValidationError';
/**
 * / Router used to dsiplay friendly message
 */
router.get('/', asynchandler(async (req, res) => {
  const courses = await Course.findAll({
    include: [{ model: User, as: 'User', attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } }],
    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
  });
  res.status(200).json(courses);
}));

router.post('/', authenticate, asynchandler(async (req, res) => {
  // console.log('create new course....  ', req.body);
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).end();
  } catch (err) {
    const { name, errors } = err;
    if (name === SQUELIZE_ERROR) {
      res.status(400);
      res.send(errors);
    } else {
      throw err;
    }
  }
}));

router.get('/:id', asynchandler(async (req, res) => {
  const course = await Course.findOne({
    where: {
      id: req.params.id,
    },
    include: [{
      model: User,
      as: 'User',
    }],
  });
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'course not found' });
  }
}));

router.put('/:id', authenticate, asynchandler(async (req, res) => {
  const user = req.currentUser;
  const oldCourse = await Course.findByPk(req.params.id);
  try {
    if (oldCourse) {
      if (oldCourse.userId === user.id) {
        const updated = await oldCourse.update(req.body);
        res.status(204).json(updated);
      } else {
        res.status(403).json({ message: 'permission denied' });
      }
    } else {
      res.status(404).json({ message: 'course not found' });
    }
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

router.delete('/:id', authenticate, asynchandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  const user = req.currentUser;
  if (course) {
    if (course.userId === user.id) {
      await course.destroy();
      res.status(204).end();
    } else {
      res.status(403).json({ message: 'permission denied' });
    }
  } else {
    res.status(404).json({ message: 'course not found' });
  }
}));

module.exports = router;
