//packages
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


//all the template
import '../../template';


FlowRouter.notFound = {

    action: function() {
      BlazeLayout.render('layout', { main: 'notFound' });
    }
};



FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('layout', { main: 'landing' });
  },
});

FlowRouter.route('/user/:userId', {
  name: 'user profile',
  action() {
    BlazeLayout.render('appLayout', { navbar:'navbar', main: 'profile' });
  },
});

FlowRouter.route('/fermedicius', {
  name: 'manage user',
  action() {
    BlazeLayout.render('layout', { navbar:'navbar', main: '' });
  },
});
FlowRouter.route('/fermedicius/manage-user', {
  name: 'manage user',
  action() {
    BlazeLayout.render('layout', { navbar:'navbar', main: 'isModerator', targetTemplate: 'manageUser' });
  },
});

FlowRouter.route('/fermedicius/users/:role', {
  name: 'user by role',
  action() {
    BlazeLayout.render('layout', { navbar:'navbar', main: 'isModerator', targetTemplate: 'usersByRole' });
  },
});
FlowRouter.route('/fermedicius/user/:userId', {
  name: 'single user',
  action() {
    BlazeLayout.render('layout', { navbar:'navbar', main: 'isModerator', targetTemplate: 'singleUser' });
  },
});

FlowRouter.route('/fermedicius/dashboard/', {
  name: 'dashboard',
  action() {
    BlazeLayout.render('layout', { navbar:'navbar', main: 'isModerator', targetTemplate: 'dashboard' });
  },
});

FlowRouter.route('/fermedicius/activities/user-management', {
  name: 'user management activity',
  action() {
    BlazeLayout.render('layout', { navbar:'navbar', main: 'isModerator', targetTemplate: 'userManagementLogs' });
  },
});
