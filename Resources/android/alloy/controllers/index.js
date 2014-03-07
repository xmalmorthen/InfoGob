function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        exitOnClose: true,
        title: "Gobierno del Estado de Colima",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.header = Alloy.createController("/layout/header", {
        id: "header",
        __parentSymbol: $.__views.index
    });
    $.__views.header.setParent($.__views.index);
    $.__views.divider_header = Alloy.createController("/layout/divider", {
        id: "divider_header",
        __parentSymbol: $.__views.index
    });
    $.__views.divider_header.setParent($.__views.index);
    $.__views.body = Alloy.createController("/layout/body", {
        id: "body",
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