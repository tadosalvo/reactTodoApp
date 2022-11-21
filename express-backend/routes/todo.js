const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = ``;

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCompleted: req.body.dateCompleted,
    dateCreated: req.body.dateCreated,
    complete: req.body.complete,
  });
  await todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        id: savedTodo._id,
        title: savedTodo.title,
        description: savedTodo.description,
        author: savedTodo.author,
        dateCompleted: savedTodo.dateCompleted,
        dateCreated: savedTodo.dateCreated,
        complete: savedTodo.complete,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res, next) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos: todos });
});

router.delete("/:id", async function (req, res, next) {
  const deleteTodo = await Todo.deleteOne()
    .where("_id")
    .equals(req.params.id)
    .exec();
  return res.status(200).json({ deleteTodo });
});

router.patch("/:id", async function (req, res, next) {
  const updateTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      dateCompleted: req.body.dateCompleted,
      complete: req.body.complete,
    },
    { new: true }
  );
  return res.status(200).json({ updateTodo });
});

module.exports = router;
