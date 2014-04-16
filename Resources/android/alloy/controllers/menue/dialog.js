function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menue/dialog";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.vw_dialog = Ti.UI.createView({
        width: "100%",
        height: "100%",
        visible: true,
        apiName: "Ti.UI.View",
        id: "vw_dialog",
        classes: [ "subview" ]
    });
    $.__views.vw_dialog && $.addTopLevelView($.__views.vw_dialog);
    $.__views.vw_ventana = Ti.UI.createView({
        borderColor: "#888",
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "#F7F7F7",
        width: "80%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        apiName: "Ti.UI.View",
        id: "vw_ventana",
        classes: [ "subviewchildren" ]
    });
    $.__views.vw_dialog.add($.__views.vw_ventana);
    $.__views.vw_header = Ti.UI.createView({
        width: "100%",
        height: Ti.UI.SIZE,
        apiName: "Ti.UI.View",
        id: "vw_header",
        classes: []
    });
    $.__views.vw_ventana.add($.__views.vw_header);
    $.__views.img_header = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        id: "img_header",
        classes: []
    });
    $.__views.vw_header.add($.__views.img_header);
    $.__views.lbl_title = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontFamily: "Helveltica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        left: 55,
        top: 17,
        apiName: "Ti.UI.Label",
        id: "lbl_title",
        classes: [ "header_titulo" ]
    });
    $.__views.vw_header.add($.__views.lbl_title);
    $.__views.img_close = Ti.UI.createImageView({
        width: 32,
        height: 32,
        top: 7,
        right: 10,
        image: "/images/own/32x32/delete.png",
        apiName: "Ti.UI.ImageView",
        id: "img_close",
        classes: []
    });
    $.__views.vw_header.add($.__views.img_close);
    Closesubviewficha ? $.__views.img_close.addEventListener("click", Closesubviewficha) : __defers["$.__views.img_close!click!Closesubviewficha"] = true;
    $.__views.__alloyId1 = Ti.UI.createView({
        top: "1dp",
        height: "1dp",
        width: "70%",
        left: "0dp",
        backgroundColor: "#000",
        apiName: "Ti.UI.View",
        classes: [ "divider" ],
        id: "__alloyId1"
    });
    $.__views.vw_ventana.add($.__views.__alloyId1);
    $.__views.scrllvw = Ti.UI.createScrollView({
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "true",
        height: "99%",
        width: "99%",
        apiName: "Ti.UI.ScrollView",
        id: "scrllvw",
        classes: []
    });
    $.__views.vw_ventana.add($.__views.scrllvw);
    $.__views.content = Ti.UI.createLabel({
        apiName: "Ti.UI.Label",
        id: "content",
        classes: []
    });
    $.__views.scrllvw.add($.__views.content);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.img_header.image = args.image;
    $.lbl_title.text = args.title || "";
    $.content.text = args.message || "";
    var Closesubviewficha = function() {
        args.close();
    };
    __defers["$.__views.img_close!click!Closesubviewficha"] && $.__views.img_close.addEventListener("click", Closesubviewficha);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;