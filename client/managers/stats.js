Template.stats.rendered = function () {
  var nano_id = Session.get('nano');
  var stages = Stages.find({nano_id:nano_id}, {
    sort: {
      created: 1
    }
  }).fetch();

  var date_categories = _.map(stages, function (e){
    return e.created;
  });
  var word_count_data = _.map(stages, function (e){
    return e.text.split(" ").length;
  });
  date_categories.unshift(0);
  word_count_data.unshift(0);
  $('#wordCountChart').highcharts({
    xAxis: {
      categories: date_categories
    },
    series: [{
      name: "Words",
      data: word_count_data
    }]
  });

  var article_count_data = _.map(stages, function (e){
    var words = e.text.split(" ");
    return _.reduce(words, function (memo, element, index, list) {
      if (element == "the" || element == "a" || element =="an"){
        return memo + 1;
      } else {
        return memo;
      }
    }, 0);

  });
  article_count_data.unshift(0);

  $('#articleCountChart').highcharts({
    xAxis: {
      categories: date_categories
    },
    series: [{
      name: "Articles",
      data: article_count_data
    }]
  });
};