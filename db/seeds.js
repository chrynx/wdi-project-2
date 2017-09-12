const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Post = require('../models/post');
const Inbox = require('../models/message');


const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, {useMongoClient: true});

Post.collection.drop();
Inbox.collection.drop();

// ==================================POSTS==============================================

Post
  .create([{
    title: 'There is a problem with memes online',
    subtitle: 're: nicolas cage',
    text: 'There are memes online that are circulating that is a disgrace for the nicolas cage memes',
    image: 'http://www.placecage.com/200/200',
    comments: [{
      text: 'Go there!',
      rating: 5
    }],
    user: '59b476daabf07a401b3a571f'
  }])
  .then((posts) => {
    console.log(`${posts.length} trainers created!`);

    return  Inbox
      .create([{
        subject: 'This is a sample subject',
        text: 'I included this image in the message ',
        image: 'http://www.placeacage.com/200/200',
        userFrom: '59b476daabf07a401b3a571f',
        userTo: '59b52348bb4e124b0edbb9dc'
      }]);

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
