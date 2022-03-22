const { body, validationResult } = require('express-validator');
const Author = require('../models/author');
const getAuthors = (req, res) => {
  Author.find((error, authors_list) => {
    if (error) {
      res.json(error);
    } else {
      res.json(authors_list);
    }
  });
};
const postAuthors = (req, res) => {
  const authorObj = new Author(req.body);
  authorObj.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: 'added author successfully' });
    }
  });
};
const deleteAuthors = (req, res) => {
  Author.findByIdAndDelete(req.params.id, req.body, function (err) {
    console.log(req.body);
    if (err) {
      res.json(err);
    } else {
      res.json({ status: `removed author with id ${req.params.id}` });
    }
  });
};
module.exports = { getAuthors, postAuthors, deleteAuthors };
