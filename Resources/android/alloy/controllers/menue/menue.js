function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menue/menue";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "black",
        font: {
            fontFamily: Alloy.Globals.Fuente.fontFamily,
            fontSize: Alloy.Globals.Fuente.tamanioActivityIndicator,
            fontWeight: "bold"
        },
        message: Alloy.Globals.resources.ActivityIndicator,
        style: Alloy.Globals.Theme.activityindicator.style,
        bottom: "5dp",
        right: "5dp",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 9999,
        apiName: "Ti.UI.ActivityIndicator",
        id: "activityIndicator",
        classes: [ "activityIndicator" ]
    });
    $.__views.activityIndicator && $.addTopLevelView($.__views.activityIndicator);
    $.__views.panel_opciones = Ti.UI.createView({
        layout: "horizontal",
        top: 3,
        left: 120,
        right: 120,
        apiName: "Ti.UI.View",
        id: "panel_opciones",
        borderColor: "red",
        borderWidth: "1",
        classes: []
    });
    $.__views.panel_opciones && $.addTopLevelView($.__views.panel_opciones);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var option = Alloy.createController("/menue/option", {
        image: "/images/own/48x48/doc_lines.png",
        title: "Kioscos de Gobierno",
        subtitle: "Ubica en el mapa los Kioscos más cercanos a tu ubicación...",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        require: "requerimientos"
    }).getView();
    $.panel_opciones.add(option);
    option = Alloy.createController("/menue/option", {
        image: "/images/own/48x48/doc_lines.png",
        title: "Kioscos de Gobierno",
        subtitle: "Ubica en el mapa los Kioscos más cercanos a tu ubicación...",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        require: "requerimientos"
    }).getView();
    $.panel_opciones.add(option);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;