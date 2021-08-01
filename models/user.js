'use strict';

const { Model } = require('sequelize');
const bycrypt = require('bcryptjs');
// const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'firstName is required',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastName is required',
        },
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email already exist',
      },
      validate: {
        notNull: {
          msg: 'lastName is required',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required',
        },
        notEmpty: {
          msg: 'Please provide a password',
        },
        len: {
          args: [8, 20],
          msg: 'The password should be between 8 and 20 characters in length',
        },
        set(val) {
          const hashedPassword = bycrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        },
      },
    },
  }, { sequelize });// end user
  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'User',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
  return User;
};
