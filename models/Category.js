const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

    // define columns
    //id set to integer ,doesn't allow null values, set as primary key, uses auto increment
    //category_name, is a string, doesn't allow null values
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
