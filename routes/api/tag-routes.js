const router = require('express').Router();
// const { json } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');
const { sequelize } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
      });
      res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id ,{
      include: [{model: Product }],
    });
    if (!tagData) {
      res.status(404)/json({ message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(tagData);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tagData) => {
    return Tag.findAll({ where: {tag_id: req.params.id}});

  })
  .then((tagData) => {
    const tagDataIds = tagData.map(({tag_id}) => tag_id);
    const newTagIds = req.body.tagIds
    .filter((tag_id) => !tagDataIds.includes(tag_id))
      .map((tag_id) =>{
        return{
          tag_id: req.params.id,
          
        };
      });
      //figure out which ones to remove
      const tagIdToRemove = tagDataIds
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
      //run both actions
      return Promise.all([
        Tag.destroy({ where: {id: tagIdToRemove }}),
        Tag.bulkCreate(newTagIds),
      ]);
    })
    .then((updatedTags) => res.json(updatedTags))
    .catch((err) => {
      res.status(400).json(err);
    });
  });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found for this id!'});
      return;
    }
    res.status(200).json(tagData);
  }catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
