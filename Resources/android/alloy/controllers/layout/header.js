function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "layout/header";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.header = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        id: "header"
    });
    $.__views.header && $.addTopLevelView($.__views.header);
    $.__views.__alloyId0 = Ti.UI.createImageView({
        image: "/images/own/48x48/lightbulb.png",
        left: 3,
        top: 3,
        width: 74,
        height: 74,
        id: "__alloyId0"
    });
    $.__views.header.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontFamily: "Helveltica",
            fontSize: "25dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        left: 77,
        top: 30,
        text: "Info[Gob] Colima",
        id: "__alloyId1"
    });
    $.__views.header.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: "#A2A2A2",
        font: {
            fontFamily: "Helveltica",
            fontSize: "18dp",
            fontStyle: "italic",
            fontWeight: "normal"
        },
        left: 77,
        top: 57,
        text: "Información de puntos de interéz...",
        id: "__alloyId2"
    });
    $.__views.header.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;