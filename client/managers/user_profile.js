$.fn.editable.defaults.mode = 'inline';
Template.user_profile.rendered = function () {
  var nano_id = Session.get('nano');

  if(! nano_id){
    return;
  }
  var nano = Nanos.findOne({_id:nano_id});
  $('#nanoTitle.editable:not(.editable-click)').editable('destroy').editable({
    success: function(response, newValue) {
      if(nano){
        // console.log(nano);
        nano.title = newValue;
        nano.save();
      }
  }});

  $('#nanoAuthor.editable:not(.editable-click)').editable('destroy').editable({
    success: function(response, newValue) {
      if(nano){
        // console.log(nano);
        nano.author = newValue;
        nano.save();
      }
  }});

  $('#nanoSummary.editable:not(.editable-click)').editable('destroy').editable({
    success: function(response, newValue) {
      if(nano){
        // console.log(nano);
        nano.summary = newValue;
        nano.save();
      }
  }});

  $('#nanoGenre.editable:not(.editable-click)').editable({
        value: nano.genre || "fantasy",
        source: [
            {value: "fantasy", text: 'Fantasy'},
            {value: "scifi", text: 'Sci-Fi'},
        ],
        success: function (response, newValue) {
          if(nano){
            // console.log(nano);
            nano.genre = newValue;
            nano.save();
          }
        }
    });


  // var stages = Stages.find({nano_id:nano_id}, {
  //   sort: {
  //     created: 1
  //   }
  // }).fetch();
  // // console.log(stages);
  // var stages_categories = _.map(stages, function (e){
  //   return nanoDate(e.created);
  // });
  // var stages_data = _.map(stages, function (e){
  //   return e.text.split(" ").length;
  // });
  // stages_categories.unshift(0);
  // stages_data.unshift(0);
  // // console.log(stages_categories, stages_data);
  // $('#wordCountChart').highcharts({
  //   xAxis: {
  //     categories: stages_categories
  //   },
  //   series: [{
  //     name: "Words",
  //     data: stages_data
  //   }]
  // });
};

Template.user_profile.helpers({
  stages: function () {
    var nano_id = Session.get('nano');
    if(nano_id){
      return Stages.find({nano_id:nano_id}, {
        sort: {
          created: -1
        }
      });
    }
  }
});

Template.user_profile.events({
  'click .save-part': function (event) {
    var stage_text = $('#nano_stage').val();
    if(stage_text !== ""){
      var stage_data = {
        'author_id': Meteor.userId(),
        'nano_id': Session.get('nano'),
        'text': stage_text,
        'created': new Date()
      };
      var stage = new Stage(stage_data);
      stage.save();
      $('#nano_stage').addClass("attn");
      $('#nano_stage').val("");
      Meteor.setTimeout(function () {
        $('#nano_stage').removeClass("attn");

      }, 1500);
    }
  },
  'change #nano_private': function (event) {
    var nano = Nanos.findOne({_id:Session.get('nano')});
    nano.private = $(event.target).prop('checked');
    nano.save();
  }
});