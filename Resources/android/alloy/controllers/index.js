function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.Theme.backgroundColor,
        layout: "vertical",
        exitOnClose: true,
        title: Alloy.Globals.resources.appTitle,
        apiName: "Ti.UI.Window",
        classes: [ "container" ],
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.header = Alloy.createController("/layout/header", {
        apiName: "Alloy.Require",
        id: "header",
        classes: [],
        __parentSymbol: $.__views.index
    });
    $.__views.header.setParent($.__views.index);
    $.__views.body = Alloy.createController("/layout/body", {
        apiName: "Alloy.Require",
        id: "body",
        classes: [],
        __parentSymbol: $.__views.index
    });
    $.__views.body.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;