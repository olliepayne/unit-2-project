const User = require('../models/user');
const Mesocycle = require('../models/mesocycle');

const dateFunctionality = require('../public/javascripts/date-functionality');

module.exports = {
  index,
  new: newOne,
  create,
  show
}

function index(req, res) {
  User.findById(req.user._id).
  populate('mesocycles'). 
  exec((err, user) => {
    res.render('mesocycles/index', {
      title: 'Your Mesocycles',
      user
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
  const newMesocycle = new Mesocycle(req.body);
  newMesocycle.save();

  req.user.mesocycles.push(newMesocycle);
  req.user.save();

  res.redirect('/users/:uid/mesocycles');
}

function show(req, res) {
  
}