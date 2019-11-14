const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');
const { wikiPage } = require('../views');
const { main } = require('../views');

router.get('/', async(req, res, next) => {
  const allPages = await Page.findAll();
  res.send(main(allPages));
})

router.post('/', async (req, res, next) => {
  const page = new Page ({
    title: req.body.title,
    content: req.body.content
  });

  console.log(page);

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
     next(error)
  }
  // res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async(req, res, next) => {
  try {
    const foundSlug = await Page.findOne({
      where: {slug: req.params.slug}
    })
    res.send(wikiPage(foundSlug));
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
