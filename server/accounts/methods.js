import {Accounts} from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(function() {

  Accounts.loginServiceConfiguration.remove({ service: "facebook"});
  Accounts.loginServiceConfiguration.remove({ service: "google"});

  Accounts.loginServiceConfiguration.insert({
    service     : 'facebook',
    "appId" : Meteor.settings.private.oAuth.facebook.appId,
    "secret" : Meteor.settings.private.oAuth.facebook.secret
  });
  Accounts.loginServiceConfiguration.insert({
    service     : 'google',
    "clientId" : Meteor.settings.private.oAuth.google.clientId,
    "secret" : Meteor.settings.private.oAuth.google.secret
  });

  if(Meteor.users.find().count()===0){

    var id = Accounts.createUser({ username : 'admin', password : 'admin123' });

    if(id){
      Roles.addUsersToRoles(id, 'admin');
    }
  }

});

Meteor.methods({
  createNewUser:function(data){
    check( data, {
      fullname:String,
      email:String,
      password:String
    });

    const userId = Accounts.createUser({
      email : data.email,
      password : data.password,
      fullname: data.fullname
    });

    if(userId){
      return true;
    }

  }
});
Accounts.onCreateUser(function(options, user) {


  Roles.setRolesOnUserObj(user, ['user']);
  var email = null;
  var profile = {};

  if (user.services) {
    const service = _.keys(user.services)[0];
    email = user.services[service].email;
    profile.fullname = user.services[service].name

    if(email != null){
      var existingUser = Meteor.users.findOne({'email': email});


      if (!existingUser){
        user.profile = profile;
        user.email = email;
        return user;
      }

        if (!existingUser.services)
           existingUser.services = { resume: { loginTokens: [] }};
        if (!existingUser.services.resume)
         existingUser.services.resume = { loginTokens: [] };


        existingUser.services[service] = user.services[service];
      
        Meteor.users.remove({_id: existingUser._id})
        return existingUser;



    }

  }else{
    profile.fullname = options.fullname;
  }




  user.profile = profile;
  user.email = email;
  return user;

});
