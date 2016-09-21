import './login.html';
Template.login.events({
  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile']}, function(err){
        if (err) {
            throw new Meteor.Error("Facebook login failed");
        }
    });
  },
  'click #google-login': function(event) {
    Meteor.loginWithGoogle({}, function(err){
        if (err) {
            throw new Meteor.Error("Google login failed");
        }
    });
  },
  "submit .login": function(event, template){
    event.preventDefault();

    email = template.find('#email').value,
    password =template.find('#password').value
    Meteor.loginWithPassword(email, password,function(error){
      if(error){
        Bert.alert( error.reason, 'danger', 'growl-top-right' );
      }else{

      }
    });

  }

});
