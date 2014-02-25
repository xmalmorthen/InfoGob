function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "header";
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
        image: "/images/own/48x48/cert.png",
        left: "3",
        top: "3",
        width: "32",
        height: "32",
        id: "__alloyId0"
    });
    $.__views.header.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        color: "#000",
        fontFamily: "Lucida Grande-Bold",
        fontSize: 12,
        left: "37",
        top: "10",
        text: "Titulo del app aqui...",
        id: "__alloyId1"
    });
    $.__views.header.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: "#cacaca",
        fontFamily: "Default",
        fontSize: 6,
        left: "37",
        top: "18",
        text: "Subtitulo, más pequeño...",
        id: "__alloyId2"
    });
    $.__views.header.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;