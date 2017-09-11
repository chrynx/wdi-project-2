const User = require('../models/user');

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      console.log(user);
      res.render('users/profile', { user, test: 'Hello' });
    })
    .catch(err => res.render('error', {err}));
}

function usersEdit (req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/edit', {user}))
    .catch(err => res.render('error', {err}));
}

function usersUpdate (req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.redirect(`${user.id}`))
    .catch(err => res.render('error', { err }));
}


module.exports = {
  show: usersShow,
  edit: usersEdit,
  update: usersUpdate
};
