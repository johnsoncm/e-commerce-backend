const router = require('express').Router();
const { beforeFindAfterExpandIncludeAll } = require('../../config/connection');
const { Category, Product } = require('../../models');

//GET ALL CATEGORIES
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
//GET 1 CATEGORY BY ID HERE
router.get('/:id', async (req, res) => {
  try{
  const categoryData = await Category.findByPk(req.params.id, {
    include: [Product],
  });
  if (!categoryData) {
    res.status(404).json({ message: 'No product found with that id! '});
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
  // find one category by its `id` value
  // be sure to include its associated Products
});

//CREATE A NEW CATEGORY HERE:
router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  }catch (err) {
    res.status(400).json(err);
  }
});


//UPDATE A CATEGORY BY ITS ID
router.put('/:id', async (req, res) => {
   try{
     const categoryData = await Category.update(
       {category_name: req.body.category_name},
       {returning: true, where: {id: req.params.id}}
     )
     res.status(200).json(categoryData);
   } catch (err) {
     res.status(400).json(err)
   }
  });




//DELETE A CATEGORY BY ID HERE:
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
      res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
