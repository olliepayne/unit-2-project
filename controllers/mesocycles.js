const User = require('../models/user');
const Mesocycle = require('../models/mesocycle');

module.exports = {
  index,
  new: newOne,
  create,
  end
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

function end(req, res) {
  const deleteThis = req.user.mesocycles[req.user.mesocycles.length - 1];
  req.user.mesocycles.pop();

  Mesocycle.deleteOne(deleteThis._id, (err) => {
    console.log('test');
  });
}