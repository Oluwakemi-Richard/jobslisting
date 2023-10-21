const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('jobs').find();
    const lists = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('jobs').find({ _id: userId });
    const lists = await result.toArray();

    if (lists.length === 0) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createSingle = async (req, res, next) => {
  try {
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
      res.status(500).json(response.error || 'Sorry, an error occurred while creating a job.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSingle = async (req, res, next) => {
  try {
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

    const response = await mongodb.getDb().db().collection('jobs').replaceOne({ _id: userId }, job);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('jobs').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = { getAll, getSingle,createSingle,updateSingle,deleteSingle};