Template.stats.rendered = function () {
  var nano_id = Session.get('nano');
  var stages = Stages.find({nano_id:nano_id}, {
    sort: {
      created: 1
    }
  }).fetch();

  var date_categories = _.map(stages, function (e){
    return nanoDate(e.created);
  });
  var word_count_data = _.map(stages, function (e){
    var txt = e.text;
    txt = txt.replace(/\s+/g, ' ');
    return txt.split(" ").length;
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
    var data = {
      total: 0,
      a: 0,
      an: 0,
      the: 0
    };
    var words = e.text.split(" ");
    _.each(words, function (element, index, list) {
      if (element == "the" || element == "a" || element =="an"){
        data[element] += 1;
        data.total += 1;
      }
    });
    return data;

  });
  

  $('#articleCountBarChart').highcharts({
    chart: {
        type: 'column'
    },
    xAxis: {
      categories: date_categories.slice(1)
    },
    series: [{
      name: "Total",
      data: _.pluck(article_count_data, 'total')
    },{
      name: "a",
      data: _.pluck(article_count_data, 'a')
    },{
      name: "an",
      data: _.pluck(article_count_data, 'an')
    },{
      name: "the",
      data: _.pluck(article_count_data, 'the')
    }]
  });

  article_count_data.unshift({
    total: 0,
    a: 0,
    an: 0,
    the: 0
  });

  $('#articleCountLineChart').highcharts({
    xAxis: {
      categories: date_categories
    },
    series: [{
      name: "Total",
      data: _.pluck(article_count_data, 'total')
    },{
      name: "a",
      data: _.pluck(article_count_data, 'a')
    },{
      name: "an",
      data: _.pluck(article_count_data, 'an')
    },{
      name: "the",
      data: _.pluck(article_count_data, 'the')
    }]
  });
};