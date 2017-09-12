const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Post = require('../models/post');
const Inbox = require('../models/message');
const User = require('../models/user');


const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, {useMongoClient: true});

Post.collection.drop();
Inbox.collection.drop();
User.collection.drop();

// ==================================POSTS==============================================

User.create([{
  username: 'mickyginger',
  firstname: 'Mike',
  lastname: 'Hayden',
  email: 'mike.hayden@ga.co',
  password: 'password',
  passwordConfirmation: 'password',
  image: 'http://placecage.com/500/500'
}, {
  username: 'chrynx',
  firstname: 'Ralph',
  lastname: 'Wendt',
  email: 'ralphmadriaga@gmail.com',
  password: 'password',
  passwordConfirmation: 'password',
  image: 'http://placecage.com/500/500'
}])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Post
      .create([{
        title: 'There is a problem with memes online',
        subtitle: 're: nicolas cage',
        text: 'There are memes online that are circulating that is a disgrace for the nicolas cage memes',
        image: 'http://www.placecage.com/200/200',
        comments: [{
          text: 'Go there!',
          rating: 'meh',
          user: 'chrynx'
        }],
        user: users[0]
      }])
      .then((posts) => {
        console.log(`${posts.length} posts created!`);
        return  Inbox
          .create([{
            subject: 'This is a sample subject',
            text: 'I included this image in the message ',
            image: 'http://www.placecage.com/200/200',
            sender: users[0],
            receiver: users[1]
          }]);
      });
  })
  .then((inbox) => {
    console.log(`${inbox.length} messages created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
