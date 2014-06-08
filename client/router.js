Router.map(function () {
  this.route('index',{
    path: "/",
  });

  this.route('discover', {
    path: "/discover"
  });

  this.route('favorites', {
    path: "/favorites"
  });

  this.route('stats', {
    path: "/:slug/stats",
    before: [
      function () {
        var nano = Nanos.findOne({slug:this.params.slug});
        Session.set('nano', nano._id);
      },
    ],
  });

  this.route('user_profile', {
    path: "/profile",
    before: [
      function () {
        if (! Meteor.user() && ! Meteor.loggingIn()) {
          // render the login template but keep the url in the browser the same
          Router.go(Router.path('index'));
          // stop the rest of the before hooks and the action function
          this.stop();
        }
      },
      function () {
        var user = Meteor.user();
        if(user){
          var nano = Nanos.findOne({author_id: user._id}) || new Nano({author_id:user._id});
          if (! nano._id){
            nano.save();
          }
          Session.set('nano', nano._id);
        }
      }
    ],
    data: function () {
      var nano_id = Session.get('nano');
      return Nanos.findOne({_id:nano_id});
    }
  });

  this.route('nano_details', {
    path: "/:slug",
    before: [
      function () {
        var nano = Nanos.findOne({slug:this.params.slug});
        Session.set('nano', nano._id);
      
      }
    ],
    data: function () {
      var nano_id = Session.get('nano');
      return Nanos.findOne({_id:nano_id});
    }
  });
});

Router.configure({
  layoutTemplate: "layout"
});