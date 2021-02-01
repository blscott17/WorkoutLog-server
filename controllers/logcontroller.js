const { response } = require('express');
const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/log');

// fat arrow function works the same as the block body function below.
// router.get('/practice', function(req,res)=>{});

router.get('/practice', function (req, res) {
  res.send('Hey!! This is a practice route!');
});
response;

// JOURNAL CREATE (12.3.3)
router.post('/', (req, res) => {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  };
  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

// (12.3.4) - GET ENTRIES BY USER // router.get('/:id', (req, res) => {
router.get('/', (req, res) => {
  console.log('REQUEST: ', req);
  let userid = req.user.id;
  Log.findAll({
    where: { owner_id: userid },
  })
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

// GET INDIVIDUAL LOG BY ID
// /:id is the endpoint I am reading on Postman ponter is req.params.id
// owner_id must match the column id in the log model is coming from sessionToken
// Authorization from Headers (must phisicall past in Postman until I create my own
// Client.
router.get('/:id', function (req, res) {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Log.findAll(query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

// (12.3.4) - UPDATING A JOURNAL ENTRY (PUT)
router.put('/:id', function (req, res) {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  };

  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Log.update(logEntry, query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

// (12.3.6) - Deleting A JOURNAL ENTRY (DELETE)
router.delete('/:id', function (req, res) {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Log.destroy(query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
