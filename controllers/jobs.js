const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('jobs').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('jobs')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
const createSingle = async (req, res) => {
  const job = {
    role: req.body.role,
    company: req.body.company,
    location: req.body.location,
    experience: req.body.experience,
    qualification: req.body.qualification,
    description: req.body.description,
    reports_to: req.body.reports_to
  };
  const response = await mongodb.getDb().db().collection('jobs').insertOne(job);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Sorry, an error occured while creating job.');
  }
};

const updateSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const job = {
    role: req.body.role,
    company: req.body.company,
    location: req.body.location,
    experience: req.body.experience,
    qualification: req.body.qualification,
    description: req.body.description,
    reports_to: req.body.reports_to
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('jobs')
    .replaceOne({ _id: userId }, job);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Sorry, an error occured while updating job.');
  }
};

const deleteSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('jobs').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Sorry, an error occured while deleting job.');
  }
};

module.exports = { getAll, getSingle,createSingle,updateSingle,deleteSingle};