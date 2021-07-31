'use strict';

const { Model, DataTypes } = require('sequelize');
const bycrypt = require('bcryptjs');
// const { sequelize } = require('.');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title is required',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     notNull: {
    //       msg: 'lastName is required',
    //     },
    //   },
    },
    estimatedTime: {
      type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: {
    //     msg: 'Email already exist',
    //   },
    //   validate: {
    //     notNull: {
    //       msg: 'lastName is required',
    //     },
    //   },
    },
    materialsNeeded: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    //   validate: {
    //     notNull: {
    //       msg: 'A password is required',
    //     },
    //     notEmpty: {
    //       msg: 'Please provide a password',
    //     },
    //   },
    },
  }, { sequelize });// end course
  Course.associations = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
};
