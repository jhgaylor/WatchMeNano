var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Profile = (function (_super){
  __extends(Profile, _super);

  function Profile () {
    return Profile.__super__.constructor.apply(this, arguments);
  }

  Profile.collectionName = "Profiles";
  Profile.beforeSave = [
    function (item) {
      // console.log("Derp, saving");
    }
  ];

  return Profile;
})(MiniModel);

