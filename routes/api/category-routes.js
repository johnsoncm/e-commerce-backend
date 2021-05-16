const router = require('express').Router();
const { beforeFindAfterExpandIncludeAll } = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
Category.findAll({
  include: [Product]
})
.then((categories) => res.json(categories))

.catch((err) => res.status(500).json(err))

});


//400 error messages w/ same .catch error structure
//.then will usually pass category
//res.status(200)
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
