var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Nano = (function (_super){
  __extends(Nano, _super);

  function Nano () {
    return Nano.__super__.constructor.apply(this, arguments);
  }

  Nano.collectionName = "Nanos";
  Nano.beforeSave = [
    function (item) {
      // item.slug = slugify(item.title);
      var i = 0;
      while(i > -1){
        var slug = slugify(item.title);
        if (i > 0){
          slug = slug + "-" + i;
        }
        if(Nanos.find({slug:slug}).count() === 0 || item.slug === slug){
          item.slug = slug;
          break;
        }
        i++;
      }
    }
  ];

  return Nano;
})(MiniModel);

