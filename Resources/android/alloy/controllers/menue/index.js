function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menue/index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: false,
        layout: "vertical",
        top: 5,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId3 = Ti.UI.createView({
        top: 10,
        borderColor: "#CACACA",
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "#A2A2A2",
        width: "70%",
        height: 100,
        id: "__alloyId3"
    });
    $.__views.index.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        top: 5,
        left: 5,
        width: 64,
        height: 64,
        image: "/images/own/48x48/cert.png",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        color: "#000",
        top: 20,
        left: 69,
        font: {
            fontFamily: "Helveltica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        text: "Opción",
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        color: "#CACACA",
        top: 35,
        left: 69,
        font: {
            fontFamily: "Helveltica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "italic"
        },
        text: "Descripción",
        id: "__alloyId6"
    });
    $.__views.__alloyId3.add($.__views.__alloyId6);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;