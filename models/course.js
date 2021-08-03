'use strict';

const { Model } = require('sequelize');
const bycrypt = require('bcryptjs');
// const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
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
        notEmpty: {
          msg: 'description cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'description is required',
        },
        notEmpty: {
          msg: 'description cannot be empty',
        },
      },
    },
    estimatedTime: {
      type: DataTypes.STRING,
    },
    materialsNeeded: {
      type: DataTypes.STRING,
    },
  }, { sequelize });// end course
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'User',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
  return Course;
};
