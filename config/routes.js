const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');

const posts = require('../controllers/posts');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const messages = require('../controllers/messages');



router.get('/', (req, res) => res.render('home', { isHomepage: true }));
router.route('/posts')
  .get(posts.index)
  .post(secureRoute, posts.create);
router.route('/posts/new')
  .get(secureRoute, posts.new);
router.route('/posts/:id')
  .get(secureRoute, posts.show)
  .put(secureRoute, posts.update)
  .delete(secureRoute, posts.delete);
router.get('/posts/:id/edit', posts.edit);
// ================================================================
router.route('/posts/:id/comments')
  .post(secureRoute, posts.commentsCreate);
router.route('/posts/:id/comments/:commentId')
  .delete(secureRoute, posts.commentsDelete);
// ===================================================================
router.route('/messages/inbox')
  .get(secureRoute, messages.inbox)
  .post(secureRoute, messages.create);
router.route('/messages/sent')
  .get(secureRoute, messages.sent);
router.route('/messages/new')
  .get(secureRoute, messages.new);
router.route('/messages/:id')
  .delete(secureRoute, messages.delete);
// ===================================================================
router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update);
router.route('/users/:id/edit')
  .get(secureRoute, users.edit);
router.route('/users/:id/password')
  .get(secureRoute, users.editPassword);
router.route('/users/:id/update')
  .put(secureRoute, users.updatePassword);
// ====================================================================
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .post(sessions.create);

router.get('/logout', sessions.delete);



// ======================================================================
// EMAIL VALIDATION
// ======================================================================
router.get('/checkemail', users.checkEmail);
router.get('/checkusername', users.checkUsername);
// =======================================================================
// =======================================================================


module.exports = router;
