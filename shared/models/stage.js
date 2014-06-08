var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Stage = (function (_super){
  __extends(Stage, _super);

  function Stage () {
    return Stage.__super__.constructor.apply(this, arguments);
  }

  Stage.collectionName = "Stages";
  Stage.beforeSave = [
    function (item) {
      // console.log("Derp, saving");
    }
  ];

  return Stage;
})(MiniModel);

