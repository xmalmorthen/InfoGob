function Controller() {
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
            ModulosKioscos.show_lista();
        }
        actualizacontroles();
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
        width: "auto",
        height: "auto",
        zIndex: 1,
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
    $.__views.lista_kioscos = Ti.UI.createTableView({
        id: "lista_kioscos",
        top: "80"
    });
    $.__views.vista_lista.add($.__views.lista_kioscos);
    click_opc ? $.__views.lista_kioscos.addEventListener("click", click_opc) : __defers["$.__views.lista_kioscos!click!click_opc"] = true;
    $.__views.__alloyId11 = Ti.UI.createView({
        top: 5,
        right: 5,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId11"
    });
    $.__views.index.add($.__views.__alloyId11);
    $.__views.toastINTERNET = Ti.UI.createImageView({
        width: 42,
        height: 42,
        id: "toastINTERNET",
        image: "/images/own/48x48/cert.png",
        message: "No conectado a internet...",
        configure: "false",
        visible: "false"
    });
    $.__views.__alloyId11.add($.__views.toastINTERNET);
    toastNotification ? $.__views.toastINTERNET.addEventListener("click", toastNotification) : __defers["$.__views.toastINTERNET!click!toastNotification"] = true;
    $.__views.toastGPS = Ti.UI.createImageView({
        width: 42,
        height: 42,
        id: "toastGPS",
        message: "Servicio de posicionamiento no habilitado o se ha perdio la conexión al GPS...",
        configure: "true",
        visible: "false"
    });
    $.__views.__alloyId11.add($.__views.toastGPS);
    toastNotification ? $.__views.toastGPS.addEventListener("click", toastNotification) : __defers["$.__views.toastGPS!click!toastNotification"] = true;
    $.__views.__alloyId12 = Ti.UI.createView({
        bottom: 5,
        right: 5,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId12"
    });
    $.__views.index.add($.__views.__alloyId12);
    $.__views.centrarposicion = Ti.UI.createImageView({
        width: 42,
        height: 42,
        id: "centrarposicion",
        image: "/images/own/48x48/target.png",
        message: "Presione para centrar su posición en el mapa...",
        visible: "false"
    });
    $.__views.__alloyId12.add($.__views.centrarposicion);
    centrarposicion ? $.__views.centrarposicion.addEventListener("click", centrarposicion) : __defers["$.__views.centrarposicion!click!centrarposicion"] = true;
    centrarposicioninfo ? $.__views.centrarposicion.addEventListener("longpress", centrarposicioninfo) : __defers["$.__views.centrarposicion!longpress!centrarposicioninfo"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.Internet = 0;
    $.index.GPS = 0;
    $.index.openedflag = 0;
    $.index.focusedflag = 0;
    $.index.focusedViewMap = 1;
    $.index.ventanaactiva = 1;
    var locationAdded = false;
    var EnableDisableBtnMap = function(estado) {
        $.btn_mapa.enabled = estado;
        $.btn_mapa.opacity = estado ? 1 : .3;
        estado ? $.btn_mapa.addEventListener("click", open_view_mapa) : $.btn_mapa.removeEventListener("click", open_view_mapa);
    };
    var VerificaInternet = function() {
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            $.index.Internet = 0;
            EnableDisableBtnMap(false);
            $.index.focusedViewMap && cambia_vista(2);
        } else {
            $.index.Internet = 1;
            EnableDisableBtnMap(true);
        }
        $.toastINTERNET.visible = !$.index.Internet;
    };
    var ToastGPS = function() {
        switch ($.index.GPS) {
          case 0:
            $.toastGPS.image = "/images/own/48x48/target.png";
            $.toastGPS.message = "Servicio de posicionamiento no habilitado o se ha perdio la conexión al GPS...";
            $.toastGPS.configure = "true";
            break;

          case 2:
            $.toastGPS.image = "/images/own/48x48/cert.png";
            $.toastGPS.message = "Buscando señal GPS...";
            $.toastGPS.configure = "false";
        }
        $.toastGPS.visible = 1 != $.index.GPS ? true : false;
        $.centrarposicion.visible = 1 == $.index.GPS ? true : false;
    };
    var iteradorGPS = 0;
    var StatusServicesTimeOut = setInterval(function() {
        if (true == $.index.focusedViewMap) {
            VerificaInternet();
            ToastGPS();
            iteradorGPS += 1;
            if (5 == iteradorGPS) {
                ObtenerPosicionGPS();
                iteradorGPS = 0;
            }
        }
    }, 1e3);
    $.index.addEventListener("close", function() {
        clearInterval(StatusServicesTimeOut);
    });
    Ti.Geolocation.preferredProvider = "gps";
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;
    var open_view_mapa = function() {
        cambia_vista(1);
    };
    var open_view_lista = function() {
        cambia_vista(2);
    };
    actualizacontroles = function() {
        $.centrarposicion.visible = $.index.focusedViewMap ? true : false;
    };
    GPSConfigure = function() {
        var settingsIntent = Titanium.Android.createIntent({
            action: "android.settings.LOCATION_SOURCE_SETTINGS"
        });
        var curActivity = Ti.Android.currentActivity;
        curActivity.startActivity(settingsIntent);
    };
    var ObtenerPosicionGPS = function() {
        Titanium.Geolocation.getCurrentPosition(function(e) {
            Ti.API.info("getCurrentPosition : " + e.code + " - " + e.error);
            if (e.success && !e.error) {
                ModulosKioscos.geolocalization.longitude = e.coords.longitude;
                ModulosKioscos.geolocalization.latitude = e.coords.latitude;
                ModulosKioscos.geolocalization.altitude = e.coords.altitude;
                ModulosKioscos.geolocalization.heading = e.coords.heading;
                ModulosKioscos.geolocalization.accuracy = e.coords.accuracy;
                ModulosKioscos.geolocalization.speed = e.coords.speed;
                ModulosKioscos.geolocalization.timestamp = e.coords.timestamp;
                ModulosKioscos.geolocalization.altitudeAccuracy = e.coords.altitudeAccuracy;
                ModulosKioscos.refreshgeomap();
                return;
            }
            1 == $.index.GPS && ($.index.GPS = 2);
        });
    };
    var open = function() {
        $.index.openedflag = 1;
        ObtenerPosicionGPS();
    };
    var locationCallback = function(e) {
        0 == $.index.openedflag && $.index.fireEvent("open");
        0 == $.index.focusedflag && $.index.fireEvent("focus");
        Ti.API.info("locationCallback : " + e.code + " - " + e.error);
        if (!e.success || e.error) {
            0 == e.code && ($.index.GPS = 0);
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
        $.index.GPS = 1;
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
    var ModulosKioscos = {
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
        getlocaldata: function() {
            var db = Ti.Database.install(Alloy.Globals.databasepath + Alloy.Globals.databases.kioscos, "kioscos"), listakioscos = db.execute("SELECT id,descripcion,domicilio,lat,lng FROM tbl_kioscos"), Data = [];
            while (listakioscos.isValidRow()) {
                var row = Ti.UI.createTableViewRow({
                    backgroundSelectedColor: "#cacaca",
                    selectedColor: "#cccccc",
                    height: Ti.UI.SIZE,
                    layout: "vertical",
                    title: listakioscos.fieldByName("descripcion"),
                    id_kiosco: listakioscos.fieldByName("id"),
                    descripcion: listakioscos.fieldByName("descripcion"),
                    domicilio: listakioscos.fieldByName("domicilio"),
                    lat: listakioscos.fieldByName("lat"),
                    lng: listakioscos.fieldByName("lng")
                });
                var Title = Ti.UI.createLabel({
                    color: "#576996",
                    font: {
                        fontFamily: "Arial",
                        fontSize: Alloy.Globals.defaultFontSize + 21,
                        fontWeight: "bold"
                    },
                    left: 2,
                    top: 2,
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    text: listakioscos.fieldByName("descripcion")
                });
                row.add(Title);
                var SubTitle = Ti.UI.createLabel({
                    color: "#222",
                    font: {
                        fontFamily: "Arial",
                        fontSize: Alloy.Globals.defaultFontSize + 9,
                        fontWeight: "normal"
                    },
                    left: 2,
                    top: 2,
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    text: listakioscos.fieldByName("domicilio")
                });
                row.add(SubTitle);
                Data.push(row);
                listakioscos.next();
            }
            listakioscos.close();
            db.close();
            $.lista_kioscos.data = Data;
        },
        show_lista: function() {
            ModulosKioscos.getlocaldata();
        },
        initmap: false,
        initializemap: function() {
            var region = {
                latitude: ModulosKioscos.geolocalization.latitude,
                longitude: ModulosKioscos.geolocalization.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            };
            var mapview = $.vista_mapa;
            mapview.region = region;
            mapview.visible = true;
        },
        refreshgeomap: function() {
            if (false == ModulosKioscos.initmap) {
                ModulosKioscos.initializemap();
                ModulosKioscos.initmap = true;
            }
        }
    };
    Titanium.Geolocation.addEventListener("location", locationCallback);
    locationAdded = true;
    $.index.addEventListener("open", open);
    $.index.addEventListener("focus", focus);
    $.index.addEventListener("blur", blur);
    var toastNotification = function() {
        var msg = this.message, opc = [ "Aceptar" ];
        "true" == this.configure && opc.push("Configurar");
        var dialog = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: opc,
            message: msg,
            title: "Servicios"
        });
        dialog.addEventListener("click", function(e) {
            e.index !== e.source.cancel && GPSConfigure();
        });
        dialog.show();
    };
    var centrarposicion = function() {
        ModulosKioscos.initializemap();
    }, centrarposicioninfo = function() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Aceptar" ],
            message: "Presione para centrar su posición en el mapa",
            title: "Posicionamiento"
        });
        dialog.show();
    };
    var click_opc = function(e) {
        e.index;
    };
    $.index.open();
    __defers["$.__views.btn_mapa!click!open_view_mapa"] && $.__views.btn_mapa.addEventListener("click", open_view_mapa);
    __defers["$.__views.__alloyId7!click!open_view_lista"] && $.__views.__alloyId7.addEventListener("click", open_view_lista);
    __defers["$.__views.lista_kioscos!click!click_opc"] && $.__views.lista_kioscos.addEventListener("click", click_opc);
    __defers["$.__views.toastINTERNET!click!toastNotification"] && $.__views.toastINTERNET.addEventListener("click", toastNotification);
    __defers["$.__views.toastGPS!click!toastNotification"] && $.__views.toastGPS.addEventListener("click", toastNotification);
    __defers["$.__views.centrarposicion!click!centrarposicion"] && $.__views.centrarposicion.addEventListener("click", centrarposicion);
    __defers["$.__views.centrarposicion!longpress!centrarposicioninfo"] && $.__views.centrarposicion.addEventListener("longpress", centrarposicioninfo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;