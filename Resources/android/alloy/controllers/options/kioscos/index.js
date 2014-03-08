function Controller() {
    function INERNETDialogOptionClick(e) {
        switch (e.index) {
          case 0:        }
    }
    function cambia_vista(opc) {
        switch (opc) {
          case 1:
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) ; else {
                $.vista_lista.zIndex = 1;
                $.vista_mapa.zIndex = 2;
                $.index.focusedViewMap = 1;
            }
            break;

          case 2:
            $.vista_mapa.zIndex = 1;
            $.vista_lista.zIndex = 2;
            $.index.focusedViewMap = 0;
        }
    }
    function GPSDialogOptionClick(e) {
        switch (e.index) {
          case 1:
            ModulosKioscos.show_lista();
            break;

          case 0:
            GPGGoActivate = true;
            var settingsIntent = Titanium.Android.createIntent({
                action: "android.settings.LOCATION_SOURCE_SETTINGS"
            });
            var curActivity = Ti.Android.currentActivity;
            curActivity.startActivity(settingsIntent);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "options/kioscos/index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: "false",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId3 = Ti.UI.createView({
        id: "__alloyId3"
    });
    $.__views.index.add($.__views.__alloyId3);
    $.__views.botonera_kioscos = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 5,
        top: 5,
        zIndex: 2,
        id: "botonera_kioscos"
    });
    $.__views.__alloyId3.add($.__views.botonera_kioscos);
    $.__views.btn_mapa = Ti.UI.createView({
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#cacaca",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "btn_mapa"
    });
    $.__views.botonera_kioscos.add($.__views.btn_mapa);
    open_view_mapa ? $.__views.btn_mapa.addEventListener("click", open_view_mapa) : __defers["$.__views.btn_mapa!click!open_view_mapa"] = true;
    $.__views.__alloyId4 = Ti.UI.createImageView({
        width: 50,
        height: 50,
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
        image: "/images/own/48x48/cert.png",
        id: "__alloyId4"
    });
    $.__views.btn_mapa.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        bottom: 5,
        color: "white",
        font: {
            fontFamily: "Arial",
            fontSize: 16,
            fontWeight: "bold"
        },
        text: "Mapa",
        id: "__alloyId5"
    });
    $.__views.btn_mapa.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createView({
        width: 5,
        height: 80,
        opacity: 0,
        id: "__alloyId6"
    });
    $.__views.botonera_kioscos.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#cacaca",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId7"
    });
    $.__views.botonera_kioscos.add($.__views.__alloyId7);
    open_view_lista ? $.__views.__alloyId7.addEventListener("click", open_view_lista) : __defers["$.__views.__alloyId7!click!open_view_lista"] = true;
    $.__views.__alloyId8 = Ti.UI.createImageView({
        width: 50,
        height: 50,
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
        image: "/images/own/48x48/cert.png",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        bottom: 5,
        color: "white",
        font: {
            fontFamily: "Arial",
            fontSize: 16,
            fontWeight: "bold"
        },
        text: "Lista",
        id: "__alloyId9"
    });
    $.__views.__alloyId7.add($.__views.__alloyId9);
    $.__views.content_kioscos = Ti.UI.createView({
        id: "content_kioscos"
    });
    $.__views.__alloyId3.add($.__views.content_kioscos);
    var __alloyId10 = [];
    $.__views.vista_mapa = Ti.Map.createView({
        animate: true,
        mapType: Ti.Map.STANDARD_TYPE,
        regionFit: true,
        userLocation: true,
        zIndex: 2,
        annotations: __alloyId10,
        ns: Ti.Map,
        id: "vista_mapa"
    });
    $.__views.content_kioscos.add($.__views.vista_mapa);
    $.__views.vista_lista = Ti.UI.createView({
        backgroundColor: "white",
        zIndex: 1,
        id: "vista_lista"
    });
    $.__views.content_kioscos.add($.__views.vista_lista);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        text: "Vista Lista",
        id: "__alloyId11"
    });
    $.__views.vista_lista.add($.__views.__alloyId11);
    var __alloyId13 = [];
    __alloyId13.push("Aceptar");
    $.__views.INTERNETDialog = Ti.UI.createAlertDialog({
        buttonNames: __alloyId13,
        id: "INTERNETDialog",
        title: "Conexión a Internet",
        message: "Es necesario contar con plan de datos movil o internet para poder ubicar los Kioscos en el mapa...",
        cancel: "0"
    });
    INERNETDialogOptionClick ? $.__views.INTERNETDialog.addEventListener("click", INERNETDialogOptionClick) : __defers["$.__views.INTERNETDialog!click!INERNETDialogOptionClick"] = true;
    var __alloyId16 = [];
    __alloyId16.push("Aceptar");
    __alloyId16.push("Cancelar");
    $.__views.GPSDialog = Ti.UI.createAlertDialog({
        buttonNames: __alloyId16,
        id: "GPSDialog",
        title: "Activar GPS",
        message: "Para ubicar los Kioscos más cercanos es necesario activar el GPS?",
        cancel: "1"
    });
    GPSDialogOptionClick ? $.__views.GPSDialog.addEventListener("click", GPSDialogOptionClick) : __defers["$.__views.GPSDialog!click!GPSDialogOptionClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.Internet = 0;
    $.index.openedflag = 0;
    $.index.focusedflag = 0;
    $.index.focusedViewMap = 1;
    var InternetTimeOut = setInterval(function() {
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            $.index.Internet = 0;
            $.btn_mapa.enabled = false;
            $.btn_mapa.opacity = .5;
            $.btn_mapa.removeEventListener("click", open_view_mapa);
            if ($.index.focusedViewMap) {
                $.INTERNETDialog.show();
                cambia_vista(2);
            }
        } else {
            $.index.Internet = 1;
            $.btn_mapa.enabled = true;
            $.btn_mapa.opacity = 1;
            $.btn_mapa.addEventListener("click", open_view_mapa);
        }
    }, 1e3);
    $.index.addEventListener("close", function() {
        clearInterval(InternetTimeOut);
    });
    var locationAdded = false, GPGGoActivate = false;
    Ti.Geolocation.preferredProvider = "gps";
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;
    var open_view_mapa = function() {
        cambia_vista(1);
    };
    var open_view_lista = function() {
        cambia_vista(2);
    };
    var open = function() {
        $.index.openedflag = 1;
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (!e.success || e.error) {
                if ($.index.Internet) {
                    Ti.API.info("getCurrentPosition => error code: " + e.code + " | Code error: " + e.error);
                    ModulosKioscos.show_lista();
                }
                return;
            }
        });
    };
    var locationCallback = function(e) {
        if (0 == $.index.openedflag) {
            Ti.API.info("firing open event");
            $.index.fireEvent("open");
        }
        if (0 == $.index.focusedflag) {
            Ti.API.info("firing focus event");
            $.index.fireEvent("focus");
        }
        if (!e.success || e.error) {
            Ti.API.info("locationCallback => error code: " + e.code + " | Code error: " + e.error);
            if (0 == e.code) {
                if ($.index.Internet) if (GPGGoActivate) ModulosKioscos.show_lista(); else {
                    $.index.fireEvent("blur");
                    $.GPSDialog.show();
                }
            } else ModulosKioscos.show_lista();
            return;
        }
        ModulosKioscos.geolocalization.longitude = e.coords.longitude;
        ModulosKioscos.geolocalization.latitude = e.coords.latitude;
        ModulosKioscos.geolocalization.altitude = e.coords.altitude;
        ModulosKioscos.geolocalization.heading = e.coords.heading;
        ModulosKioscos.geolocalization.accuracy = e.coords.accuracy;
        ModulosKioscos.geolocalization.speed = e.coords.speed;
        ModulosKioscos.geolocalization.timestamp = e.coords.timestamp;
        ModulosKioscos.geolocalization.altitudeAccuracy = e.coords.altitudeAccuracy;
        ModulosKioscos.refreshgeomap();
    };
    var focus = function() {
        $.index.focusedflag = 1;
        if (!locationAdded && locationCallback) {
            Ti.API.info("adding location callback on resume [FOCUS]");
            Titanium.Geolocation.addEventListener("location", locationCallback);
            locationAdded = true;
        }
    };
    var blur = function() {
        if (locationAdded) {
            Ti.API.info("adding location callback on resume [BLUR]");
            Titanium.Geolocation.removeEventListener("location", locationCallback);
            locationAdded = false;
        }
    };
    var list = false;
    var ModulosKioscos = {
        IsGPSActivated: false,
        geolocalization: {
            longitude: "",
            latitude: "",
            altitude: "",
            heading: "",
            accuracy: "",
            speed: "",
            timestamp: "",
            altitudeAccuracy: ""
        },
        show_lista: function() {
            ModulosKioscos.IsGPSActivated = false;
            if (!list) {
                if (!ModulosKioscos.IsGPSActivated) {
                    var descripcion = "GPS no accesible, se mostrará una lista de módulos de Kioscos...";
                    Titanium.UI.createAlertDialog({
                        title: "Lista",
                        message: descripcion
                    }).show();
                }
                if (!$.index.Internet) {
                    var descripcion = "GPS no accesible, se mostrará una lista de módulos de Kioscos...";
                    Titanium.UI.createAlertDialog({
                        title: "Lista",
                        message: descripcion
                    }).show();
                }
                list = true;
                cambia_vista(2);
            }
        },
        refreshgeomap: function() {
            ModulosKioscos.IsGPSActivated = true;
            Ti.API.info("longitude: " + ModulosKioscos.geolocalization.latitude + " | latitude: " + ModulosKioscos.geolocalization.longitude);
            var region = {
                latitude: ModulosKioscos.geolocalization.latitude,
                longitude: ModulosKioscos.geolocalization.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            };
            var mapview = $.vista_mapa;
            mapview.region = region;
            mapview.visible = true;
        }
    };
    $.index.addEventListener("open", open);
    Titanium.Geolocation.addEventListener("location", locationCallback);
    locationAdded = true;
    $.index.addEventListener("focus", focus);
    $.index.addEventListener("blur", blur);
    $.index.open();
    __defers["$.__views.btn_mapa!click!open_view_mapa"] && $.__views.btn_mapa.addEventListener("click", open_view_mapa);
    __defers["$.__views.__alloyId7!click!open_view_lista"] && $.__views.__alloyId7.addEventListener("click", open_view_lista);
    __defers["$.__views.INTERNETDialog!click!INERNETDialogOptionClick"] && $.__views.INTERNETDialog.addEventListener("click", INERNETDialogOptionClick);
    __defers["$.__views.GPSDialog!click!GPSDialogOptionClick"] && $.__views.GPSDialog.addEventListener("click", GPSDialogOptionClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;