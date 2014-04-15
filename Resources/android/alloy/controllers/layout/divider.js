function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "layout/divider";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.divider = Ti.UI.createView({
        top: "1dp",
        height: "1dp",
        width: "70%",
        left: "0dp",
        backgroundColor: Alloy.Globals.Theme.dividerColor,
        apiName: "Ti.UI.View",
        classes: [ "divider" ],
        id: "divider"
    });
    $.__views.divider && $.addTopLevelView($.__views.divider);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;