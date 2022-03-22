const { body, validationResult } = require('express-validator');
const Forum = require('../models/forum');
const getForums = (req, res) => {
  Forum.find((err, forums_list) => {
    if (err) {
      res.json(error);
    } else {
      res.json(forums_list);
    }
  });
};
const postForums = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('title should have length min 10 ,max 100 chars'),
  body('forumBody')
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage('forum body should have length min 50 and max 500 chars'),
  body('author')
    .trim()
    .isAlphanumeric()
    .withMessage('author name should not contain special characters')
    .isLength({ min: 5, max: 50 })
    .withMessage('author name should have length min 5 and max 50 chars'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_errors: errors });
    } else {
      const forumObj = new Forum(req.body);
      forumObj.save((err) => {
        if (err) {
          res.json(err);
        } else {
          res.json({ status: 'added forum successfully' });
        }
      });
    }
  },
];
const deleteForums = (req, res) => {
  Forum.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: `removed forum with id ${req.params.id}` });
    }
  });
};
const updateForums = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('title should have length min 10 ,max 100 chars'),
  body('forumBody')
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage('forum body should have length min 50 and max 500 chars'),
  body('author')
    .trim()
    .isAlphanumeric()
    .withMessage('author name should not contain special characters')
    .isLength({ min: 5, max: 50 })
    .withMessage('author name should have length min 5 and max 50 chars'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_errors: errors });
    } else {
      let newValues = { $set: req.body };
      Forum.findByIdAndUpdate(req.params.id, newValues, function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json(`updated forum with id ${req.params.id}`);
        }
      });
    }
  },
];
module.exports = { getForums, postForums, deleteForums, updateForums };
