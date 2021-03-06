const User = require('../models/user');

function sessionsCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Invalid Credentials');
        res.redirect('/register');
      }
      // user is authenticated
      req.session.userId = user.id;
      req.flash('success', `Welcome back ${user.username}`);
      res.redirect('/posts');
    });
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => {
    req.flash('danger', 'You have been logged out');
    res.redirect('/');

  });
}

module.exports = {
  create: sessionsCreate,
  delete: sessionsDelete
};
