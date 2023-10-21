const express = require('express');
const router = express.Router();

const jobsController = require('../controllers/jobs');
const validate = require('../util/jobdata-validation');


router.get('/', jobsController.getAll);

router.get('/:id', validate.validateJob.idChekRules(), validate.validateJob.checkData, jobsController.getSingle);

router.post('/', validate.validateJob.createUpdateSingleRules(),validate.validateJob.checkData, jobsController.createSingle);

router.put('/:id',validate.validateJob.idChekRules(), validate.validateJob.createUpdateSingleRules(),validate.validateJob.checkData, jobsController.updateSingle);

router.delete('/:id', validate.validateJob.idChekRules(), validate.validateJob.checkData, jobsController.deleteSingle);

module.exports = router;