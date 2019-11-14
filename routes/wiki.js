const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.send('');
})

router.post('/', async (req, res, next) => {
  const page = new Page ({
    title: req.body.title,
    content: req.body.content
  });

  console.log(page);

  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
     next(error)
  }
  // res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', (req, res, next) => {
  res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
