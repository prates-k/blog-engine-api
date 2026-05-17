'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
      this.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};