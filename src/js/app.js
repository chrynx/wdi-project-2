$('#newPostForm').validate();
$('#newRegistrationForm').validate();
$('#newLoginForm').validate();
$('#newCommentForm').validate();
$('.is-danger').delay(2000).animate({opacity: '0', height: '0', padding: '0', margin: '0'});
$('.is-success').delay(2000).animate({opacity: '0', height: '0', padding: '0', margin: '0'});

// ====================================================================================
// EMAIL VALIDATION
// ====================================================================================
$('form#register').validate({
  rules: {
    email: { email: true, remote: '/checkemail' },
    username: { remote: '/checkusername' },
    passwordConfirmation: { equalTo: '[name=password]' }
  },
  messages: {
    email: { email: 'Please enter a valid email address', remote: 'This email is already registered' },
    username: { remote: 'This username is already registered' },
    passwordConfirmation: { equalTo: 'Passwords must match' }
  }
});

console.log($('form#register').find('[name=username]').rules());
// =====================================================================================
// =====================================================================================


$('form#changePassword').validate({
  rules: {
    passwordConfirmation: { equalTo: '[name=password]' }
  },
  messages: {
    passwordConfirmation: { equalTo: 'Passwords must match' }
  }
});
