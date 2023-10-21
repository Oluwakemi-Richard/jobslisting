const { body, validationResult } = require("express-validator")
const { param } = require('express-validator');
//const mongodb = require('./mongodb');
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const validateJob = {};

validateJob.createUpdateSingleRules = () => {
  return [
    body('role').trim().isLength({ min: 2 }).withMessage("Please provide a role."),
    body('company').notEmpty().isString().withMessage("Please provide a company."),
    body('location').notEmpty().isString().withMessage("Please provide a loation."),
    body('experience').notEmpty().isString().withMessage("Please provide an experience level."),
    body('qualification').notEmpty().isString().withMessage("Please provide the required qualifiation."),
    body('description').notEmpty().isString().withMessage("Please provide a job desription."),
    body('reports_to').notEmpty().isString().withMessage("Please provide supervisor role or None if not appliable."),
  ];
};

validateJob.idChekRules = () => {
  return [
    param('id').isString().isMongoId().withMessage('Use a valid string job ID'),
  ];
};


validateJob.checkData = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
module.exports = {
  validateJob
};