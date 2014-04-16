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
    $.__views.principal_content_options = Ti.UI.createScrollView({
        height: "auto",
        width: "auto",
        showVerticalScrollIndicator: true,
        bottom: 5,
        apiName: "Ti.UI.ScrollView",
        id: "principal_content_options",
        classes: []
    });
    $.__views.principal_content_options && $.addTopLevelView($.__views.principal_content_options);
    $.__views.panel_opciones = Ti.UI.createView({
        layout: "vertical",
        top: 3,
        left: 3,
        right: 3,
        apiName: "Ti.UI.View",
        id: "panel_opciones",
        classes: []
    });
    $.__views.principal_content_options.add($.__views.panel_opciones);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var option = Alloy.createController("/menue/option", {
        image: "/images/own/128x128/photo_zoom.png",
        title: "Kioscos de Gobierno",
        subtitle: "Muestra en el mapa los Kioscos más cercanos a tu ubicación...",
        description: "Mediante el posicionamiento GPS, permite ubicar en el mapa los distintos Kioscos de Gobierno y su proximidad con respecto a su ubicación, en caso de no tener GPS activo, sólo se mostrarán las ubicaciónes de los Kioscos, así mismo tendrá la opción de revisar una lista con los Kioscos que gobierno tiene a sus servicio...",
        require: {
            gps: true,
            internet: true
        },
        callcontroller: ""
    }).getView();
    $.panel_opciones.add(option);
    option = Alloy.createController("/menue/option", {
        image: "/images/own/128x128/note_tagged.png",
        title: "Módulos CURP",
        subtitle: "Muestra en el mapa lo Módulos CURP más cercanos a tu ubicación...",
        description: "Mediante el posicionamiento GPS, permite ubicar en el mapa los distintos Módulos CURP de Gobierno y su proximidad con respecto a su ubicación, en caso de no tener GPS activo, sólo se mostrarán las ubicaciónes de los Módulos CURP, así mismo tendrá la opción de revisar una lista con los Módulos CURP que gobierno tiene a sus servicio...",
        require: {
            gps: true,
            internet: true
        },
        callcontroller: ""
    }).getView();
    $.panel_opciones.add(option);
    option = Alloy.createController("/menue/option", {
        image: "/images/own/128x128/rss.png",
        title: "Zona Internet Gratuita",
        subtitle: "Muestra en el mapa los Espacios con Internet gratuito más cercanos a tu ubicación...",
        description: "Mediante el posicionamiento GPS, permite ubicar en el mapa los distintos espacios con Internet y su proximidad con respecto a su ubicación, en caso de no tener GPS activo, sólo se mostrarán las ubicaciónes de los espacios con Internét, así mismo tendrá la opción de revisar una lista con los espacios con Internet que gobierno tiene a sus servicio...",
        require: {
            gps: true,
            internet: true
        },
        callcontroller: ""
    }).getView();
    $.panel_opciones.add(option);
    option = Alloy.createController("/menue/option", {
        image: "/images/own/128x128/user_starred.png",
        title: "Directorio Integral",
        subtitle: "Consulta al Directorio Integral de Gobierno del Estado de Colima...",
        description: "Haga las busquedas en el directorio para consultar los datos de ubicación y contacto de algún funcionario de Gobierno del Estado de Colima...",
        require: {
            gps: false,
            internet: true
        },
        callcontroller: ""
    }).getView();
    $.panel_opciones.add(option);
    option = Alloy.createController("/menue/option", {
        image: "/images/own/128x128/note_starred.png",
        title: "RETyS",
        subtitle: "Registro Estatal de Trámites y Servicios...",
        description: "Consulte la información completa sobre algun trámite en específico, lugares donde poder realizarlos, requisitos, horarios de atención, entre otras...",
        require: {
            gps: false,
            internet: true
        },
        callcontroller: ""
    }).getView();
    $.panel_opciones.add(option);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;