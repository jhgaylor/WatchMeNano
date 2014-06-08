Template.watched.helpers({
  nanos: function () {
    return Nanos.find({slug: {$in: this.watched}});
  }
});

Template.watched_list_item.helpers({
  author: function () {
    return Profiles.find({author_id:this.author_id});
  }
});