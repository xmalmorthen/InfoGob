function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "options/kioscos/index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.index.add($.__views.__alloyId3);
    $.__views.botonera_kioscos = Ti.UI.createView({
        id: "botonera_kioscos",
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId3.add($.__views.botonera_kioscos);
    $.__views.__alloyId4 = Ti.UI.createView({
        borderColor: "#133899",
        borderWidth: "6",
        borderRadius: "5",
        backgroundColor: "orange",
        width: "30%",
        height: "80",
        id: "__alloyId4"
    });
    $.__views.botonera_kioscos.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createImageView({
        image: "/images/own/48x48/cert.png",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        text: "Mapa",
        id: "__alloyId6"
    });
    $.__views.__alloyId4.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        borderColor: "#133899",
        borderWidth: "6",
        borderRadius: "2",
        backgroundColor: "orange",
        width: "30%",
        height: "80",
        id: "__alloyId7"
    });
    $.__views.botonera_kioscos.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createImageView({
        image: "/images/own/48x48/cert.png",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        text: "Lista",
        id: "__alloyId9"
    });
    $.__views.__alloyId7.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createView({
        borderColor: "#133899",
        borderWidth: "6",
        borderRadius: "2",
        backgroundColor: "orange",
        width: "30%",
        height: "80",
        id: "__alloyId10"
    });
    $.__views.botonera_kioscos.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createImageView({
        image: "/images/own/48x48/cert.png",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        text: "Ayuda",
        id: "__alloyId12"
    });
    $.__views.__alloyId10.add($.__views.__alloyId12);
    $.__views.content_kioscos = Ti.UI.createView({
        id: "content_kioscos"
    });
    $.__views.__alloyId3.add($.__views.content_kioscos);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        text: "Contenido",
        id: "__alloyId13"
    });
    $.__views.content_kioscos.add($.__views.__alloyId13);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;