const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

   // define columns
    //id set to integer ,doesn't allow null values, set as primary key, uses auto increment
    //tag_name is a string
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
