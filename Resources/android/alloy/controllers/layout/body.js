function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "layout/body";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.body = Ti.UI.createView({
        height: "100%",
        backgroundColor: Alloy.Globals.Theme.backgroundColor,
        top: 10,
        apiName: "Ti.UI.View",
        classes: [ "body" ],
        id: "body"
    });
    $.__views.body && $.addTopLevelView($.__views.body);
    $.__views.menue = Alloy.createController("/menue/menue", {
        apiName: "Alloy.Require",
        id: "menue",
        classes: [],
        __parentSymbol: $.__views.body
    });
    $.__views.menue.setParent($.__views.body);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;