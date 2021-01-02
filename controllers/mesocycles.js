const User = require('../models/user');
const Mesocycle = require('../models/mesocycle');

module.exports = {
  index,
  new: newOne,
  create,
  show,
  delete: deleteOne,
  update
}

function index(req, res) {
  User.findById(req.user._id).
  populate('mesocycles'). 
  exec((err, user) => {
    res.render('mesocycles/index', {
      title: 'Mesocycles',
      user,
      mesocycles: user.mesocycles
    })
  });
}

function newOne(req, res) {
  res.render('mesocycles/new', {
    title: 'New',
    user: req.user
  });
}

function create(req, res) {
  Mesocycle.create(req.body, (err, newMesocycle) => {
    User.findById(req.user._id, (err, user) => {
      user.mesocycles.push(newMesocycle);
      user.save((err) => {
        res.redirect('/mesocycles');
      });
    });
  });
}

function show(req, res) {
  
}

function deleteOne(req, res) {
  Mesocycle.findByIdAndDelete(req.params.id, (err, deletedMeso) => {
    User.findById(req.user._id, (err, user) => {
      const deletedMesoIndex = user.mesocycles.indexOf(deletedMeso);
      user.mesocycles.splice(deletedMesoIndex, 1);

      res.redirect('/mesocycles');
    });
  });

  // Mesocycle.findByIdAndDelete(req.params.id, (err) => {
  //   res.redirect('/mesocycles');
  // });
}

function update(req, res) {
  Mesocycle.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(() => {
    res.redirect('/mesocycles');
  });
}