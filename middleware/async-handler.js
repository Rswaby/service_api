'use strict';

const asynchandler = callBack => async (req, res, next) => {
  try {
    await callBack(req, res, next);
  } catch (error) {
    console.dir(error);
    res.status(500);
    res.send(error);
  }
};

module.exports = asynchandler;
