import './signup.html';
Template.signup.events({
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
  "submit .signUp": function(event, template){
    event.preventDefault();
    const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if ($.trim(template.find("#fullname").value) == '') {
      return Bert.alert( 'full name', 'warning', 'growl-top-right' );
    }

    if ($.trim(template.find("#email").value) == '' || template.find("#email").value.match(emailRegEx) == null) {
      return Bert.alert( 'Email', 'warning', 'growl-top-right' );
    }
    if ($.trim(template.find("#password").value) == '') {
      return Bert.alert( 'password', 'warning', 'growl-top-right' );
    }
    const data = {

      fullname:template.find('#fullname').value,
      email:template.find('#email').value,
      password:template.find('#password').value
    }

    Meteor.call("createNewUser", data, function(error, result){
      if(error){
        Bert.alert( error.reason, 'danger', 'growl-top-right' );
      }
      if(result){

        template.find('#fullname').value="";
        template.find('#email').value="";
        template.find('#password').value="";

        
        Bert.alert({
          type: 'success',
          title: 'Hi ' + data.fullname + ' !',
          message: 'Welcome to fermedicius, please verify your account.',
          icon: 'fa-check-circle',
          hideDelay: 6500
        });
      }
    });
  }

});
