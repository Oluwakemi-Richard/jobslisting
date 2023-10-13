const express = require('express');
const router = express.Router();

const jobsController = require('../controllers/jobs');

router.get('/', jobsController.getAll);

router.get('/:id', jobsController.getSingle);

router.post('/', jobsController.createSingle);

router.put('/:id', jobsController.updateSingle);

router.delete('/:id', jobsController.deleteSingle);

module.exports = router;