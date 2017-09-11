const Post = require('../models/post');

function postsIndex(req, res) {
  Post
    .find()
    .populate('user')
    .exec()
    .then(posts => {
      posts.reverse();
      res.render('posts/index', {posts});
    })
    .catch(err => res.render('error', {err}));
}

function postsShow (req, res) {
  Post
    .findById(req.params.id)
    .populate('user')
    .exec()
    .then(post => res.render('posts/show', {post}))
    .catch(err => res.render('error', { err }));
}

function postsNew (req, res) {
  res.render('posts/new');
}

function postsCreate (req, res) {

  req.body.user = req.currentUser;

  Post
    .create(req.body)
    .then(() => res.redirect('/posts'))
    .catch(err => res.render('error', {err}));
}

function postsEdit (req, res) {
  Post
    .findById(req.params.id)
    .exec()
    .then(post => res.render('posts/edit', {post}))
    .catch(err => res.render('error', {err}));
}

function postsUpdate (req, res) {
  Post
    .findById(req.params.id)
    .exec()
    .then(post => {
      post = Object.assign(post, req.body);
      return post.save();
    })
    .then(post => res.redirect(`/posts/${post.id}`))
    .catch(err => res.render('error', {err}));
}

function postsDelete (req, res) {
  Post
    .findById(req.params.id)
    .exec()
    .then(post => {
      return post.remove();
    })
    .then( () => res.redirect('/posts'))
    .catch((err) => res.render('error', {err}));
}
// =============================================================================
function postsCommentsCreate(req, res) {
  Post
    .findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .exec()
    .then(post => {
      post.comments.push(req.body);
      return post.save();
    })
    .then(post => res.redirect(`/posts/${post.id}`))
    .catch(err => res.render('error', {err}));
}

function postsCommentsDelete(req, res) {
  Post
    .findById(req.params.id)
    .exec()
    .then(posts => {
      const comment = posts.comments.id(req.params.commentId);
      comment.remove();
      return posts.save();
    })
    .then(posts => res.redirect(`/posts/${posts.id}`))
    .catch(err => res.render('error', {err}));
}
// ===========================================================================


// =======================================================================


module.exports = {
  index: postsIndex,
  show: postsShow,
  new: postsNew,
  create: postsCreate,
  edit: postsEdit,
  update: postsUpdate,
  delete: postsDelete,
  // ========================
  commentsCreate: postsCommentsCreate,
  commentsDelete: postsCommentsDelete
};
