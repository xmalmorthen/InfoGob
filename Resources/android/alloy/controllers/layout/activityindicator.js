function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "layout/activityindicator";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.activityindicator = Ti.UI.createActivityIndicator({
        color: "black",
        font: {
            fontFamily: Alloy.Globals.Fuente.fontFamily,
            fontSize: Alloy.Globals.Fuente.tamanioActivityIndicator,
            fontWeight: "bold"
        },
        message: Alloy.Globals.resources.ActivityIndicator,
        style: Alloy.Globals.Theme.activityindicator.style,
        bottom: "5dp",
        right: "5dp",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 9999,
        apiName: "Ti.UI.ActivityIndicator",
        classes: [ "activityIndicator" ],
        id: "activityindicator"
    });
    $.__views.activityindicator && $.addTopLevelView($.__views.activityindicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;