// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
    // define columns
    //id set to integer ,doesn't allow null values, set as primary key, uses auto increment
    //product_name, is a string, doesnt allow null values
    //price, decimal, doesn't allow null values, validates that the value is a  decimal
    //stock is an integer, doesn't allow null values, set a default value of 10, valudates that the value is numeric
    //category_id is an integer, references Category model's id
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '10',
      isDecimal: true,
      isNumeric: true,
  
    },
    category_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
