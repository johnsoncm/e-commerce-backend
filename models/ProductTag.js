const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}


    // define columns
    //id set to integer ,doesn't allow null values, set as primary key, uses auto increment
    //product_id is an integer, references Product model's id
    //tag_id is an integer, references Tag model's id
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      //references Product model's id
      references: {
        model: 'product',
        key: 'id',
      },

    },
    tag_id: {
      type: DataTypes.INTEGER,
      //references Tag model's id
      references: {
        model: 'tag',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
