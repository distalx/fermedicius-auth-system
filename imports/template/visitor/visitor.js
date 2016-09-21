import './visitor.html';
Template.visitor.onCreated(function() {
  this.isSignup = new ReactiveVar( false );

});


Template.visitor.helpers({
  isSignup: function(){
     return Template.instance().isSignup.get();
  }
});

Template.visitor.events({
  "click #signup": function(event, template){
     template.isSignup.set( true );
  },
  "click #login": function(event, template){
     template.isSignup.set( false );
  }
});
