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
        width: "90%",
        height: "270dp",
        layout: "vertical",
        top: 5,
        bottom: 5,
        borderColor: Alloy.Globals.Menue.bordercolor,
        borderWidth: Alloy.Globals.Menue.borderwidth,
        borderRadius: Alloy.Globals.Menue.borderradius,
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
        width: Alloy.Globals.Imagen.grande,
        height: Alloy.Globals.Imagen.grande,
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
        left: Alloy.Globals.Imagen.grande,
        right: 3,
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
        left: 2,
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
        left: 2,
        apiName: "Ti.UI.Label",
        id: "option_subtitle",
        classes: [ "fit_size" ]
    });
    $.__views.vw_labels_header.add($.__views.option_subtitle);
    $.__views.option_actions = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        bottom: 1,
        left: 3,
        apiName: "Ti.UI.View",
        id: "option_actions",
        classes: []
    });
    $.__views.main_view.add($.__views.option_actions);
    $.__views.vw_require = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        left: 5,
        bottom: 1,
        apiName: "Ti.UI.View",
        id: "vw_require",
        classes: [ "fit_size" ]
    });
    $.__views.option_actions.add($.__views.vw_require);
    $.__views.img_internet = Ti.UI.createImageView({
        width: Alloy.Globals.Imagen.mediana,
        height: Alloy.Globals.Imagen.mediana,
        right: 5,
        image: "/images/own/128x128/bullet_accept.png",
        apiName: "Ti.UI.ImageView",
        id: "img_internet",
        classes: [ "img_style" ]
    });
    $.__views.vw_require.add($.__views.img_internet);
    internet_info ? $.__views.img_internet.addEventListener("click", internet_info) : __defers["$.__views.img_internet!click!internet_info"] = true;
    $.__views.img_gps = Ti.UI.createImageView({
        width: Alloy.Globals.Imagen.mediana,
        height: Alloy.Globals.Imagen.mediana,
        right: 5,
        image: "/images/own/128x128/bullet_accept.png",
        apiName: "Ti.UI.ImageView",
        id: "img_gps",
        classes: [ "img_style" ]
    });
    $.__views.vw_require.add($.__views.img_gps);
    gps_info ? $.__views.img_gps.addEventListener("click", gps_info) : __defers["$.__views.img_gps!click!gps_info"] = true;
    $.__views.action_open = Ti.UI.createImageView({
        width: Alloy.Globals.Imagen.grande,
        height: Alloy.Globals.Imagen.grande,
        right: 5,
        image: "/images/own/128x128/bullet_accept.png",
        apiName: "Ti.UI.ImageView",
        id: "action_open",
        classes: []
    });
    $.__views.option_actions.add($.__views.action_open);
    action_open ? $.__views.action_open.addEventListener("click", action_open) : __defers["$.__views.action_open!click!action_open"] = true;
    $.__views.__alloyId2 = Ti.UI.createView({
        top: "2dp",
        height: "1dp",
        width: "70%",
        right: "0dp",
        backgroundColor: Alloy.Globals.Theme.dividerColor,
        apiName: "Ti.UI.View",
        classes: [ "divider" ],
        id: "__alloyId2"
    });
    $.__views.main_view.add($.__views.__alloyId2);
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
    $.img_gps.visible = args.require.gps;
    $.img_internet.visible = args.require.internet;
    var option = args.callcontroller, internet_info = function() {
        Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Aceptar" ],
            message: "Es necesario contar con Internét o Plan de Datos...",
            title: "Conexión a Internet"
        }).show();
    }, gps_info = function() {
        Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Aceptar" ],
            message: "Se recomienda tener el GPS habilitado...",
            title: "Posicionamiento GPS"
        }).show();
    }, action_open = function() {
        Alloy.createController(option).getView().open();
    };
    __defers["$.__views.img_internet!click!internet_info"] && $.__views.img_internet.addEventListener("click", internet_info);
    __defers["$.__views.img_gps!click!gps_info"] && $.__views.img_gps.addEventListener("click", gps_info);
    __defers["$.__views.action_open!click!action_open"] && $.__views.action_open.addEventListener("click", action_open);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;