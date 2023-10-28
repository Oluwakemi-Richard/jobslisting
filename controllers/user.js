const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator')

const getUsers = async (req, res, next) => {
  const db = await mongodb.getDb()
  const result = await db.db("Joblists").collection("users").find()
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(lists)
  })
};

const getSingle = async (req, res, next) => {
  const userid = new ObjectId(req.params.id)
  const db = await mongodb.getDb()
  const result = await db
    .db("Joblists")
    .collection("users")
    .find({ _id: userid })
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(lists[0])
  })
};



const createUser = async (req, res, next) => {
  if (req.body.firstName == null) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json("firstName is a required field")
  } else if (req.body.lastName == null) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json("lastName is a required field")
  } else if (req.body.jobsApplied == null) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json("jobsApplied is a required field")
  } else {
    const db = await mongodb.getDb()
    const result = await db.db("Joblists").collection("users").insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobsApplied: req.body.jobsApplied,
    })

    res.setHeader("Content-Type", "application/json")
    res.status(201).json({ id: result.insertedId })
  }
}

const updateUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json({ errors: errors.array() })
    return
  }
  let userid = null
  try {
    userid = new ObjectId(req.params.id)
  } catch {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json("This is not a valid ID format")
    return
  }
  let firstName, lastName, jobsApplied
  const db = await mongodb.getDb()
  result = await db
    .db("Joblists")
    .collection("users")
    .find({ _id: userid })
    .toArray()
  if (result.length == 0) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json("There is no user with that ID")
    return
  }
  result = result[0]
  if (req.body.firstName == null) {
    firstName = result.firstName
  } else {
    firstName = req.body.firstName
  }
  if (req.body.lastName == null) {
    lastName = result.lastName
  } else {
    lastName = req.body.lastName
  }
  if (req.body.jobsApplied == null) {
    jobsApplied = result.jobsApplied
  } else {
    jobsApplied = req.body.jobsApplied
  }
  result = await db
    .db("Joblists")
    .collection("users")
    .updateOne(
      { _id: userid },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          jobsApplied: jobsApplied,
        },
      }
    )
  res.setHeader("Content-Type", "application/json")
  res.status(204).json("Documents modified:" + result.modifiedCount)
}

const deleteUser = async (req, res, next) => {
  const userid = new ObjectId(req.params.id)
  const db = await mongodb.getDb()
  const checkID = await db
    .db("Joblists")
    .collection("users")
    .find({ _id: userid })
    .toArray()
  if (checkID.length > 0) {
    const result = await db
      .db("Joblists")
      .collection("users")
      .deleteOne({ _id: userid })
    res.setHeader("Content-Type", "application/json")
    res.status(200).json("Documents deleted:" + result.deletedCount)
  }
}

module.exports = { getUsers, getSingle, createUser, updateUser, deleteUser};