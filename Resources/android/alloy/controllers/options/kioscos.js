function Controller() {
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
    this.__controllerPath = "options/kioscos";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.kioscos = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        title: "Kioscos de servicios",
        exitOnClose: "false",
        id: "kioscos"
    });
    $.__views.kioscos && $.addTopLevelView($.__views.kioscos);
    var __alloyId8 = [];
    $.__views.map = Ti.Map.createView({
        animate: true,
        mapType: Ti.Map.STANDARD_TYPE,
        regionFit: true,
        userLocation: true,
        visible: "false",
        annotations: __alloyId8,
        ns: Ti.Map,
        id: "map"
    });
    $.__views.kioscos.add($.__views.map);
    $.__views.listakioscos = Ti.UI.createView({
        id: "listakioscos",
        visible: "false",
        backgroundColor: "red"
    });
    $.__views.kioscos.add($.__views.listakioscos);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        text: "Prueba de carga de tabla",
        id: "__alloyId9"
    });
    $.__views.listakioscos.add($.__views.__alloyId9);
    var __alloyId11 = [];
    __alloyId11.push("Aceptar");
    __alloyId11.push("Cancelar");
    $.__views.GPSDialog = Ti.UI.createAlertDialog({
        buttonNames: __alloyId11,
        id: "GPSDialog",
        title: "Activar GPS",
        message: "Para ubicar los Kioscos más cercanos es necesario activar el GPS?",
        cancel: "1"
    });
    GPSDialogOptionClick ? $.__views.GPSDialog.addEventListener("click", GPSDialogOptionClick) : __defers["$.__views.GPSDialog!click!GPSDialogOptionClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var locationAdded = false;
    var GPGGoActivate = false;
    $.kioscos.openedflag = 0;
    $.kioscos.focusedflag = 0;
    Ti.Geolocation.preferredProvider = "gps";
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;
    var open = function() {
        $.kioscos.openedflag = 1;
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (!e.success || e.error) {
                Ti.API.info("getCurrentPosition => error code: " + e.code + " | Code error: " + e.error);
                ModulosKioscos.show_lista();
                return;
            }
        });
    };
    $.kioscos.addEventListener("open", open);
    var locationCallback = function(e) {
        if (0 == $.kioscos.openedflag) {
            Ti.API.info("firing open event");
            $.kioscos.fireEvent("open");
        }
        if (0 == $.kioscos.focusedflag) {
            Ti.API.info("firing focus event");
            $.kioscos.fireEvent("focus");
        }
        if (!e.success || e.error) {
            Ti.API.info("locationCallback => error code: " + e.code + " | Code error: " + e.error);
            if (0 == e.code) if (GPGGoActivate) ModulosKioscos.show_lista(); else {
                $.kioscos.fireEvent("blur");
                $.GPSDialog.show();
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
    Titanium.Geolocation.addEventListener("location", locationCallback);
    locationAdded = true;
    var focus = function() {
        $.kioscos.focusedflag = 1;
        if (!locationAdded && locationCallback) {
            Ti.API.info("adding location callback on resume [FOCUS]");
            Titanium.Geolocation.addEventListener("location", locationCallback);
            locationAdded = true;
        }
    };
    $.kioscos.addEventListener("focus", focus);
    var blur = function() {
        if (locationAdded) {
            Ti.API.info("adding location callback on resume [BLUR]");
            Titanium.Geolocation.removeEventListener("location", locationCallback);
            locationAdded = false;
        }
    };
    $.kioscos.addEventListener("blur", blur);
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
            $.map.visible = false;
            if (!list) {
                var descripcion = "GPS no accesible, se mostrará una lista de módulos de Kioscos...";
                Titanium.UI.createAlertDialog({
                    title: "Lista",
                    message: descripcion
                }).show();
                list = true;
                $.listakioscos.visible = true;
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
            var mapview = $.map;
            mapview.region = region;
            mapview.visible = true;
        }
    };
    __defers["$.__views.GPSDialog!click!GPSDialogOptionClick"] && $.__views.GPSDialog.addEventListener("click", GPSDialogOptionClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;