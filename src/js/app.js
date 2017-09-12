console.log('Hello world');
const comment = require('../models/post');
const $ratingColor = $('.rating');
const rating = [
  'ridiculous',
  'bad',
  'meh',
  'decent',
  'spectacular'
];
if(comment.rating === rating[0]){
  $ratingColor.css('background-color: red');
}
if(comment.rating === rating[1]){
  $ratingColor.toggleClass('bad');
}
if(comment.rating === rating[2]){
  $ratingColor.toggleClass('meh');
}
if(comment.rating === rating[3]){
  $ratingColor.toggleClass('decent');
}
if(comment.rating === rating[4]){
  $ratingColor.toggleClass('spectacular');
}
