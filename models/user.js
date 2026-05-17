'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, { foreingnkey: 'userId', as: 'posts' });
      this.hasMany(models.Comment, { foreingnkey: 'userId', as: 'comments' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
  }, 
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};