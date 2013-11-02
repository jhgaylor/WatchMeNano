Handlebars.registerHelper('breaklines', function(text) {
  // text = Handlebars.Utils.escapeExpression(text);
  text = text.toString();
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
  
  return new Handlebars.SafeString("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+text);
});

// Templating helpers, similar to template tags in django
// returns true if the input route is the same as the currently
// active route

Handlebars.registerHelper("linkify", function (text){
  var urlPattern = /(http|ftp|https):\/\/([\w-]+(\.[\w-]+)+)([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
  var result = text.replace(urlPattern, "<a href=\"$&\" target=\"_blank\">$&</a>");
  return result;
});

Handlebars.registerHelper("activePage", function (routeName) {
  var context = Router.current();
  return context && (context.route.name == routeName) && 'active';
});

// returns a human readable datestamp from a js date object
Handlebars.registerHelper("prettifyDate", function(timestamp) {
  if(timestamp === undefined){
    return "";
  }
  if(Match.test(timestamp, String) || Match.test(timestamp, Number)){
    timestamp = new Date(timestamp);
  }
  var curr_date = timestamp.getDate();
  var curr_month = timestamp.getMonth() + 1; //Months are zero based
  var curr_year = timestamp.getFullYear();
  if(curr_month < 10){
    curr_month = "0"+curr_month;
  }
  if(curr_date < 10){
    curr_date = "0"+curr_date;
  }
  return curr_month + "/" + curr_date + "/" + curr_year;
});

Handlebars.registerHelper("prettifyDateTime", function(timestamp) {
  if(timestamp === null){
    return "";
  }
  if(Match.test(timestamp, String)){
    timestamp = new Date(timestamp);
  }
  var curr_date = timestamp.getDate();
  var curr_month = timestamp.getMonth() + 1; //Months are zero based
  var curr_year = timestamp.getFullYear();
  var curr_hour = timestamp.getHours();
  var curr_minutes = timestamp.getMinutes();

  if(curr_month < 10){
    curr_month = "0"+curr_month;
  }
  if(curr_date < 10){
    curr_date = "0"+curr_date;
  }
  if(curr_hour < 10){
    curr_hour = "0"+curr_hour;
  }
  if(curr_minutes < 10){
    curr_minutes = "0"+curr_minutes;
  }


  return curr_hour + ":" + curr_minutes + " " +curr_month + "/" + curr_date + "/" + curr_year;
});


Handlebars.registerHelper("toFixed", function(number, after_decimal) {
  return number.toFixed(after_decimal);
});

Handlebars.registerHelper("truncate", function(text) {
  words = text.split(" ")
  return words.splice(0, 100).join(" ") + " . . . ";
});

