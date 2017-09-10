const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');

const posts = require('../controllers/posts');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

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
router.get('/messages/inbox', posts.messagesInbox);
// ===================================================================
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.get('/logout', sessions.delete);

module.exports = router;
