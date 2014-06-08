Meteor.startup(function () {
  // For some event hooks https://github.com/BenjaminRH/meteor-event-hooks
  Hooks.init();
  Hooks.onLoggedIn = function () {
    Router.go('user_profile');
  };
});