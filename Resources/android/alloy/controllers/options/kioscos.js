function Controller() {
    function GPSDialogOptionClick(e) {
        switch (e.index) {
          case 0:
            alert("Ayuda");
            break;

          case 1:
            alert("Cancelar");
            break;

          case 2:
            alert("Aceptar");
            GPGGoActivate = true;
            $.kioscos.fireEvent("open");
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
        id: "kioscos"
    });
    $.__views.kioscos && $.addTopLevelView($.__views.kioscos);
    $.__views.__alloyId3 = Ti.UI.createView({
        id: "__alloyId3"
    });
    $.__views.kioscos.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        text: "Kioscos",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    var __alloyId6 = [];
    __alloyId6.push("Ayuda");
    __alloyId6.push("Cancelar");
    __alloyId6.push("Aceptar");
    $.__views.GPSDialog = Ti.UI.createAlertDialog({
        buttonNames: __alloyId6,
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
            "Error gps: " + JSON.stringify(e.error) + " error code: " + e.code;
            if (0 == e.code) {
                Titanium.Geolocation.removeEventListener("location", locationCallback);
                if (!GPGGoActivate) {
                    $.kioscos.openedflag = 0;
                    $.GPSDialog.show();
                }
            }
            return;
        }
        e.coords.longitude;
        e.coords.latitude;
        e.coords.altitude;
        e.coords.heading;
        e.coords.accuracy;
        e.coords.speed;
        e.coords.timestamp;
        e.coords.altitudeAccuracy;
    };
    Ti.Geolocation.preferredProvider = "gps";
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;
    $.kioscos.addEventListener("open", function() {
        $.kioscos.openedflag = 1;
        Titanium.Geolocation.addEventListener("location", locationCallback);
        locationAdded = true;
    });
    $.kioscos.addEventListener("blur", function() {
        if (locationAdded) {
            Titanium.Geolocation.removeEventListener("location", locationCallback);
            locationAdded = false;
        }
    });
    $.kioscos.addEventListener("focus", function() {
        $.kioscos.focusedflag = 1;
        if (!locationAdded && locationCallback) {
            Ti.API.info("adding location callback on resume");
            Titanium.Geolocation.addEventListener("location", locationCallback);
            locationAdded = true;
        }
    });
    __defers["$.__views.GPSDialog!click!GPSDialogOptionClick"] && $.__views.GPSDialog.addEventListener("click", GPSDialogOptionClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;