Template.nano_details.rendered = function () {
  var nano_id = Session.get('nano');

  if(! nano_id){
    return;
  }
  var stages = Stages.find({nano_id:nano_id}, {
    sort: {
      created: 1
    }
  }).fetch();
  // console.log(stages);
  var stages_categories = _.map(stages, function (e){
    return nanoDate(e.created);
  });
  var stages_data = _.map(stages, function (e){
    var txt = e.text;
    txt = txt.replace(/\s+/g, ' ');
    return txt.split(" ").length;
  });
  stages_categories.unshift(0);
  stages_data.unshift(0);
  // console.log(stages_categories, stages_data);
  $('#wordCountChart').highcharts({
    xAxis: {
      categories: stages_categories
    },
    series: [{
      name: "Words",
      data: stages_data
    }]
  });
};

Template.nano_details.helpers({
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