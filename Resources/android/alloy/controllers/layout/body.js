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
        layout: "vertical",
        backgroundColor: "white",
        id: "body"
    });
    $.__views.body && $.addTopLevelView($.__views.body);
    $.__views.menue = Alloy.createController("/menue", {
        id: "menue",
        __parentSymbol: $.__views.body
    });
    $.__views.menue.setParent($.__views.body);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;