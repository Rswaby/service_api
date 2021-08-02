'use strict';

const auth = require('basic-auth');
const bycrypt = require('bcryptjs');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  let message;

  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({ where: { emailAddress: credentials.name } });
    if (user) {
      const authenticated = bycrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.emailAddress}`);

        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.emailAddress}`;
      }// auth check
    } else {
      message = `User not found for username: ${credentials.name}`;
    }// no user check
  } else {
    message = 'Auth header not found';
  } // credentials check

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};
module.exports = authenticate;
