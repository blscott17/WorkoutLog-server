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
// router.get('/:id', (req, res) => {
module.exports = router;
