const express = require('express');
const Celebrity = require('../models/celebrity');
const router = express.Router();

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebs) => {
      res.render('./celebrities/index', { celebs });
    })
    .catch((err) => {
      console.log('Error generating /celebrities route ===> ', err);
    });
});

router.get('/new', (req, res) => {
  res.render('celebrities/new');
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      console.log('Celebrity found!');
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      res.render('not-found');
      console.log('Error upon deletion ===> ', error);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celeb) => {
      res.render('celebrities/show', { celeb });
    })
    .catch(() => {
      res.render('not-found');
    });
});

router.post('/', (req, res) => {
  const { celebName, celebOccupation, celebCatchPhrase } = req.body;

  newCeleb = {
    name: celebName,
    occupation: celebOccupation,
    catchPhrase: celebCatchPhrase,
  };

  Celebrity.create(newCeleb)
    .then((x) => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      res.render('celebrities/new');
    });
});

router.post('/:id/delete', (req, res) => {
  const { id } = req.params;
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('not-found');
      console.log('Error upon deletion ===> ', error);
    });
});

router.post('/:id', (req, res) => {
  const { id } = req.params;
  const { celebName, celebOccupation, celebCatchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, {
    name: celebName,
    occupation: celebOccupation,
    catchPhrase: celebCatchPhrase,
  })
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('not-found');
      console.log('Error upon editing ===> ', error);
    });
});

module.exports = router;
