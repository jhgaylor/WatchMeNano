Nanos = new Meteor.Collection("nanos", {
  transform: function (doc) {
    return new Nano(doc);
  }
});

Stages = new Meteor.Collection("stages", {
  transform: function (doc) {
    return new Stage(doc);
  }
});

Profiles = new Meteor.Collection("profiles", {
  transform: function (doc) {
    return new Profile(doc);
  }
});
