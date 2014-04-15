function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menue/option";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.main_view = Ti.UI.createView({
        width: "45%",
        height: "200dp",
        layout: "vertical",
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        borderColor: "red",
        borderWidth: "3dp",
        borderRadius: 10,
        apiName: "Ti.UI.View",
        id: "main_view",
        classes: [ "fit_size" ]
    });
    $.__views.main_view && $.addTopLevelView($.__views.main_view);
    $.__views.vw_header = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        left: 5,
        apiName: "Ti.UI.View",
        id: "vw_header",
        classes: [ "fit_size" ]
    });
    $.__views.main_view.add($.__views.vw_header);
    $.__views.option_img = Ti.UI.createImageView({
        width: Alloy.Globals.Imagen.mediana,
        height: Alloy.Globals.Imagen.mediana,
        left: 0,
        apiName: "Ti.UI.ImageView",
        id: "option_img",
        classes: [ "fit_size" ]
    });
    $.__views.vw_header.add($.__views.option_img);
    $.__views.vw_labels_header = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "vertical",
        bottom: 1,
        left: Alloy.Globals.Imagen.mediana,
        apiName: "Ti.UI.View",
        id: "vw_labels_header",
        classes: [ "fit_size" ]
    });
    $.__views.vw_header.add($.__views.vw_labels_header);
    $.__views.option_title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: Alloy.Globals.Fuente.colorTitulo,
        font: {
            fontFamily: Alloy.Globals.Fuente.fontFamily,
            fontSize: Alloy.Globals.Fuente.tamanioFuenteTitulo,
            fontStyle: "normal",
            fontWeight: "bold"
        },
        left: 1,
        apiName: "Ti.UI.Label",
        id: "option_title",
        classes: [ "fit_size" ]
    });
    $.__views.vw_labels_header.add($.__views.option_title);
    $.__views.option_subtitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: Alloy.Globals.Fuente.colorTexto,
        font: {
            fontFamily: Alloy.Globals.Fuente.fontFamily,
            fontSize: Alloy.Globals.Fuente.tamanioFuenteTexto,
            fontStyle: "normal"
        },
        left: 1,
        apiName: "Ti.UI.Label",
        id: "option_subtitle",
        classes: [ "fit_size" ]
    });
    $.__views.vw_labels_header.add($.__views.option_subtitle);
    $.__views.option_actions = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 3,
        right: 2,
        layout: "horizontal",
        apiName: "Ti.UI.View",
        id: "option_actions",
        classes: [ "fit_size" ]
    });
    $.__views.main_view.add($.__views.option_actions);
    $.__views.action_require = Ti.UI.createImageView({
        width: Alloy.Globals.Imagen.pequenia,
        height: Alloy.Globals.Imagen.pequenia,
        left: 2,
        right: 2,
        image: "/images/own/48x48/doc_lines.png",
        apiName: "Ti.UI.ImageView",
        id: "action_require",
        classes: []
    });
    $.__views.option_actions.add($.__views.action_require);
    action_require ? $.__views.action_require.addEventListener("click", action_require) : __defers["$.__views.action_require!click!action_require"] = true;
    $.__views.action_open = Ti.UI.createImageView({
        width: Alloy.Globals.Imagen.pequenia,
        height: Alloy.Globals.Imagen.pequenia,
        left: 2,
        right: 2,
        image: "/images/own/48x48/doc_lines.png",
        apiName: "Ti.UI.ImageView",
        id: "action_open",
        classes: []
    });
    $.__views.option_actions.add($.__views.action_open);
    action_open ? $.__views.action_open.addEventListener("click", action_open) : __defers["$.__views.action_open!click!action_open"] = true;
    $.__views.__alloyId0 = Ti.UI.createView({
        top: "2dp",
        height: "1dp",
        width: "70%",
        right: "0dp",
        backgroundColor: Alloy.Globals.Theme.dividerColor,
        apiName: "Ti.UI.View",
        classes: [ "divider" ],
        id: "__alloyId0"
    });
    $.__views.main_view.add($.__views.__alloyId0);
    $.__views.scroll_vw = Ti.UI.createScrollView({
        top: 1,
        height: "84dp",
        width: "auto",
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: false,
        apiName: "Ti.UI.ScrollView",
        id: "scroll_vw",
        classes: []
    });
    $.__views.main_view.add($.__views.scroll_vw);
    $.__views.option_description = Ti.UI.createLabel({
        color: Alloy.Globals.Fuente.colorTexto,
        font: {
            fontFamily: Alloy.Globals.Fuente.fontFamily,
            fontSize: Alloy.Globals.Fuente.tamanioFuenteTexto,
            fontStyle: "normal"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 5,
        left: 15,
        right: 15,
        width: "auto",
        height: "auto",
        apiName: "Ti.UI.Label",
        id: "option_description",
        classes: []
    });
    $.__views.scroll_vw.add($.__views.option_description);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.option_img.image = args.image;
    $.option_title.text = args.title || "";
    $.option_subtitle.text = args.subtitle || "";
    $.option_description.text = args.description || "";
    var action_require = function() {
        alert("action_require");
    }, action_open = function() {
        alert("action_open");
    };
    __defers["$.__views.action_require!click!action_require"] && $.__views.action_require.addEventListener("click", action_require);
    __defers["$.__views.action_open!click!action_open"] && $.__views.action_open.addEventListener("click", action_open);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;