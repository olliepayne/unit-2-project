const User = require('../models/user');
const Mesocycle = require('../models/mesocycle');

module.exports = {
  index,
  new: newOne,
  create,
  show
}

function index(req, res) {
  // User.findById(req.params.id, (err, result) => {
  //   res.render('mesocycles/index', {
  //     title: 'Your Mesocycles', 
  //     user: req.user,
  //     // pass mesocycle index for user
  //   });
  // });
  User.findById(req.user.id, (err, result) => {
    res.render('mesocycles/index', {
      title: 'Your Mesocycles',
      user: req.user,
      userModel: result
    });
  });
}

function newOne(req, res) {
  res.render('mesocycles/new', {
    title: 'New Mesocycle',
    user: req.user
  });
}

function create(req, res) {
  Mesocycle.create(req.body, (err, m) => {
    User.findById(req.params.id, (err, u) => {
      u.mesocycles.push(m);
    });
  });
}

function show(req, res) {
  
}