// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.b

// Categories have many Products

// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
