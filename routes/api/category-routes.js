const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: [product_name]
      }
    }
  )
  .then(catData => res.json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).res.json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product, 
      attributes: ['category_id']
    }
  })
  .then(catData => res.json(catData))
  .catch(err => {
    console.group(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(catData => res.json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(catData => {
    if (!catData) {
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(catData => {
    if (!catData) {
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.json(catData);
  })
  .catcj(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
