function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "layout/header";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.header = Ti.UI.createView({
        apiName: "Ti.UI.View",
        height: Ti.UI.SIZE,
        width: "auto",
        top: "3",
        bottom: "3",
        id: "header",
        classes: []
    });
    $.__views.header && $.addTopLevelView($.__views.header);
    $.__views.header_image = Ti.UI.createImageView({
        image: "/images/own/48x48/lightbulb.png",
        width: Alloy.Globals.Imagen.grande,
        height: Alloy.Globals.Imagen.grande,
        left: 1,
        apiName: "Ti.UI.ImageView",
        id: "header_image",
        classes: []
    });
    $.__views.header.add($.__views.header_image);
    $.__views.vw_header_labels = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: Alloy.Globals.Imagen.grande,
        apiName: "Ti.UI.View",
        id: "vw_header_labels",
        classes: []
    });
    $.__views.header.add($.__views.vw_header_labels);
    $.__views.header_titulo = Ti.UI.createLabel({
        color: Alloy.Globals.Fuente.colorTitulo,
        font: {
            fontFamily: Alloy.Globals.Fuente.fontFamily,
            fontSize: Alloy.Globals.Fuente.tamanioFuenteTitulo,
            fontStyle: "normal",
            fontWeight: "bold"
        },
        left: 2,
        text: Alloy.Globals.resources.header.titulo,
        apiName: "Ti.UI.Label",
        id: "header_titulo",
        classes: []
    });
    $.__views.vw_header_labels.add($.__views.header_titulo);
    $.__views.header_subtitulo = Ti.UI.createLabel({
        color: Alloy.Globals.Fuente.colorSubtitulo,
        font: {
            fontFamily: Alloy.Globals.Fuente.fontFamily,
            fontSize: Alloy.Globals.Fuente.tamanioFuenteSubTitulo,
            fontStyle: "italic",
            fontWeight: "normal"
        },
        left: 2,
        text: Alloy.Globals.resources.header.subtitulo,
        apiName: "Ti.UI.Label",
        id: "header_subtitulo",
        classes: []
    });
    $.__views.vw_header_labels.add($.__views.header_subtitulo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;