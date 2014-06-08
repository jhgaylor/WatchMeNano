Template.discover.helpers({
  nanos: function () {
    return Nanos.find({private:false});
  }
});

Template.discover_list_item.helpers({
  author: function () {
    return Profiles.find({author_id:this.author_id});
  }
});