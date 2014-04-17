function Controller() {
    function cambia_vista(opc) {
        if (ventanaactiva == opc) return;
        $.activityIndicator.show();
        switch (opc) {
          case 1:
            $.vista_lista.zIndex = 1;
            $.vista_mapa.zIndex = 2;
            ventanaactiva = 1;
            MuestraKioscosMapa();
            break;

          case 2:
            $.vista_mapa.zIndex = 1;
            $.vista_lista.zIndex = 2;
            ventanaactiva = 2;
            MuestraListaKioscos();
        }
        VerificaGPS();
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
        apiName: "Ti.UI.Window",
        classes: [ "content" ],
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "black",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        message: "Cargando...",
        style: Titanium.UI.ActivityIndicatorStyle.BIG,
        bottom: 5,
        right: 5,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 9999,
        apiName: "Ti.UI.ActivityIndicator",
        id: "activityIndicator",
        classes: []
    });
    $.__views.index.add($.__views.activityIndicator);
    $.__views.__alloyId3 = Ti.UI.createView({
        apiName: "Ti.UI.View",
        id: "__alloyId3",
        classes: []
    });
    $.__views.index.add($.__views.__alloyId3);
    $.__views.botonera_kioscos = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 5,
        top: 5,
        zIndex: 2,
        opacity: .7,
        apiName: "Ti.UI.View",
        id: "botonera_kioscos",
        classes: []
    });
    $.__views.__alloyId3.add($.__views.botonera_kioscos);
    $.__views.btn_mapa = Ti.UI.createView({
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#929090",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        apiName: "Ti.UI.View",
        id: "btn_mapa",
        classes: [ "btn_botonera" ]
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
        apiName: "Ti.UI.ImageView",
        image: "/images/own/48x48/map_marker.png",
        classes: [ "img_btn" ],
        id: "__alloyId4"
    });
    $.__views.btn_mapa.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        bottom: 2,
        color: "white",
        font: {
            fontFamily: "Arial",
            fontSize: 18,
            fontWeight: "bold"
        },
        text: "Mapa",
        apiName: "Ti.UI.Label",
        classes: [ "lbl_btn" ],
        id: "__alloyId5"
    });
    $.__views.btn_mapa.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createView({
        width: 5,
        height: 80,
        opacity: 0,
        apiName: "Ti.UI.View",
        classes: [ "margin" ],
        id: "__alloyId6"
    });
    $.__views.botonera_kioscos.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#929090",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        apiName: "Ti.UI.View",
        classes: [ "btn_botonera" ],
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
        apiName: "Ti.UI.ImageView",
        image: "/images/own/48x48/list_ingredients.png",
        classes: [ "img_btn" ],
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        bottom: 2,
        color: "white",
        font: {
            fontFamily: "Arial",
            fontSize: 18,
            fontWeight: "bold"
        },
        text: "Lista",
        apiName: "Ti.UI.Label",
        classes: [ "lbl_btn" ],
        id: "__alloyId9"
    });
    $.__views.__alloyId7.add($.__views.__alloyId9);
    $.__views.content_kioscos = Ti.UI.createView({
        width: "auto",
        height: "auto",
        zIndex: 1,
        apiName: "Ti.UI.View",
        id: "content_kioscos",
        classes: []
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
        apiName: "Ti.Map.View",
        ns: Ti.Map,
        id: "vista_mapa",
        classes: []
    });
    $.__views.content_kioscos.add($.__views.vista_mapa);
    click_map ? $.__views.vista_mapa.addEventListener("click", click_map) : __defers["$.__views.vista_mapa!click!click_map"] = true;
    $.__views.vista_lista = Ti.UI.createView({
        backgroundColor: "white",
        zIndex: 1,
        apiName: "Ti.UI.View",
        id: "vista_lista",
        classes: []
    });
    $.__views.content_kioscos.add($.__views.vista_lista);
    $.__views.vw_title_listakioscos = Ti.UI.createView({
        top: 20,
        left: 150,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        apiName: "Ti.UI.View",
        id: "vw_title_listakioscos",
        classes: []
    });
    $.__views.vista_lista.add($.__views.vw_title_listakioscos);
    $.__views.title_listakioscos = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontFamily: "Helveltica",
            fontSize: "44dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        text: "Lista de Kioscos de servicios",
        apiName: "Ti.UI.Label",
        id: "title_listakioscos",
        classes: []
    });
    $.__views.vw_title_listakioscos.add($.__views.title_listakioscos);
    $.__views.lista_kioscos = Ti.UI.createTableView({
        top: 80,
        left: 5,
        right: 5,
        apiName: "Ti.UI.TableView",
        id: "lista_kioscos",
        classes: []
    });
    $.__views.vista_lista.add($.__views.lista_kioscos);
    click_opc ? $.__views.lista_kioscos.addEventListener("click", click_opc) : __defers["$.__views.lista_kioscos!click!click_opc"] = true;
    $.__views.vistatramites = Ti.UI.createView({
        width: "100%",
        height: "100%",
        visible: false,
        apiName: "Ti.UI.View",
        id: "vistatramites",
        classes: [ "subview" ]
    });
    $.__views.__alloyId3.add($.__views.vistatramites);
    $.__views.subviewchildren = Ti.UI.createView({
        borderColor: "#888",
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "#F7F7F7",
        width: "80%",
        height: "80%",
        layout: "vertical",
        apiName: "Ti.UI.View",
        id: "subviewchildren",
        classes: [ "subviewchildren" ]
    });
    $.__views.vistatramites.add($.__views.subviewchildren);
    $.__views.__alloyId11 = Ti.UI.createView({
        apiName: "Ti.UI.View",
        width: "100%",
        height: Ti.UI.SIZE,
        id: "__alloyId11",
        classes: []
    });
    $.__views.subviewchildren.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        width: "48",
        height: "48",
        top: "7",
        left: "5",
        image: "/images/own/48x48/list_ingredients.png",
        id: "__alloyId12",
        classes: []
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontFamily: "Helveltica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        left: 55,
        top: 17,
        text: "Lista de trámites...",
        apiName: "Ti.UI.Label",
        classes: [ "header_titulo" ],
        id: "__alloyId13"
    });
    $.__views.__alloyId11.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        width: "32",
        height: "32",
        top: "7",
        right: "10",
        image: "/images/own/32x32/delete.png",
        id: "__alloyId14",
        classes: []
    });
    $.__views.__alloyId11.add($.__views.__alloyId14);
    Closesubviewtramites ? $.__views.__alloyId14.addEventListener("click", Closesubviewtramites) : __defers["$.__views.__alloyId14!click!Closesubviewtramites"] = true;
    $.__views.__alloyId15 = Ti.UI.createView({
        top: "5",
        height: "1dp",
        width: "70%",
        left: "0dp",
        backgroundColor: "#000",
        apiName: "Ti.UI.View",
        classes: [ "divider" ],
        id: "__alloyId15"
    });
    $.__views.subviewchildren.add($.__views.__alloyId15);
    $.__views.lista_tramiteskioscos = Ti.UI.createTableView({
        left: 10,
        apiName: "Ti.UI.TableView",
        id: "lista_tramiteskioscos",
        classes: []
    });
    $.__views.subviewchildren.add($.__views.lista_tramiteskioscos);
    click_tramitekiosco ? $.__views.lista_tramiteskioscos.addEventListener("click", click_tramitekiosco) : __defers["$.__views.lista_tramiteskioscos!click!click_tramitekiosco"] = true;
    $.__views.vistaficharetys = Ti.UI.createView({
        width: "100%",
        height: "100%",
        visible: false,
        apiName: "Ti.UI.View",
        id: "vistaficharetys",
        classes: [ "subview" ]
    });
    $.__views.__alloyId3.add($.__views.vistaficharetys);
    $.__views.subviewficharetyschildren = Ti.UI.createView({
        borderColor: "#888",
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "#F7F7F7",
        width: "80%",
        height: "80%",
        layout: "vertical",
        apiName: "Ti.UI.View",
        id: "subviewficharetyschildren",
        classes: [ "subviewchildren" ]
    });
    $.__views.vistaficharetys.add($.__views.subviewficharetyschildren);
    $.__views.__alloyId16 = Ti.UI.createView({
        apiName: "Ti.UI.View",
        width: "100%",
        height: Ti.UI.SIZE,
        id: "__alloyId16",
        classes: []
    });
    $.__views.subviewficharetyschildren.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        width: "48",
        height: "48",
        top: "7",
        left: "5",
        image: "/images/own/48x48/doc_lines.png",
        id: "__alloyId17",
        classes: []
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontFamily: "Helveltica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        left: 55,
        top: 17,
        text: "Ficha RETyS",
        apiName: "Ti.UI.Label",
        classes: [ "header_titulo" ],
        id: "__alloyId18"
    });
    $.__views.__alloyId16.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        width: "32",
        height: "32",
        top: "7",
        right: "10",
        image: "/images/own/32x32/delete.png",
        id: "__alloyId19",
        classes: []
    });
    $.__views.__alloyId16.add($.__views.__alloyId19);
    Closesubviewficha ? $.__views.__alloyId19.addEventListener("click", Closesubviewficha) : __defers["$.__views.__alloyId19!click!Closesubviewficha"] = true;
    $.__views.__alloyId20 = Ti.UI.createView({
        top: "5",
        height: "1dp",
        width: "70%",
        left: "0dp",
        backgroundColor: "#000",
        apiName: "Ti.UI.View",
        classes: [ "divider" ],
        id: "__alloyId20"
    });
    $.__views.subviewficharetyschildren.add($.__views.__alloyId20);
    $.__views.scrllvw = Ti.UI.createScrollView({
        apiName: "Ti.UI.ScrollView",
        id: "scrllvw",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "true",
        height: "99%",
        width: "99%",
        classes: []
    });
    $.__views.subviewficharetyschildren.add($.__views.scrllvw);
    $.__views.__alloyId21 = Ti.UI.createView({
        top: 5,
        right: 5,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        apiName: "Ti.UI.View",
        classes: [ "toastbanner" ],
        id: "__alloyId21"
    });
    $.__views.index.add($.__views.__alloyId21);
    $.__views.toastINTERNET = Ti.UI.createImageView({
        width: 30,
        height: 34,
        apiName: "Ti.UI.ImageView",
        id: "toastINTERNET",
        image: "/images/own/48x48/no_internet.png",
        message: "No conectado a internet...",
        configure: "false",
        visible: "false",
        classes: []
    });
    $.__views.__alloyId21.add($.__views.toastINTERNET);
    toastNotification ? $.__views.toastINTERNET.addEventListener("click", toastNotification) : __defers["$.__views.toastINTERNET!click!toastNotification"] = true;
    $.__views.toastGPS = Ti.UI.createImageView({
        width: 38,
        height: 38,
        apiName: "Ti.UI.ImageView",
        id: "toastGPS",
        left: "10",
        classes: [ "toast" ],
        message: "Servicio de posicionamiento no habilitado o se ha perdio la conexión al GPS...",
        configure: "true",
        code: "null",
        visible: "false"
    });
    $.__views.__alloyId21.add($.__views.toastGPS);
    toastNotification ? $.__views.toastGPS.addEventListener("click", toastNotification) : __defers["$.__views.toastGPS!click!toastNotification"] = true;
    $.__views.__alloyId22 = Ti.UI.createView({
        bottom: 5,
        right: 5,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        apiName: "Ti.UI.View",
        classes: [ "botonera_inferior_derecha" ],
        id: "__alloyId22"
    });
    $.__views.index.add($.__views.__alloyId22);
    $.__views.centrarposicion = Ti.UI.createImageView({
        width: 38,
        height: 38,
        apiName: "Ti.UI.ImageView",
        id: "centrarposicion",
        classes: [ "toast" ],
        image: "/images/own/48x48/target.png",
        message: "Presione para centrar su posición en el mapa...",
        visible: "false"
    });
    $.__views.__alloyId22.add($.__views.centrarposicion);
    centrarposicion ? $.__views.centrarposicion.addEventListener("click", centrarposicion) : __defers["$.__views.centrarposicion!click!centrarposicion"] = true;
    centrarposicioninfo ? $.__views.centrarposicion.addEventListener("longpress", centrarposicioninfo) : __defers["$.__views.centrarposicion!longpress!centrarposicioninfo"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/etc/internet.js");
    Ti.include("/etc/gps.js");
    var openedflag = 0, focusedflag = 0, ventanaactiva = 1, locationAdded = false;
    $.toastINTERNET.visible = !verificasihayinternet();
    Titanium.Network.addEventListener("change", function(e) {
        $.toastINTERNET.visible = !e.online;
    });
    var VerificaGPS = function() {
        if (1 == ventanaactiva) {
            if (null != GPS.error.error || null != GPS.error.codigo) {
                if ($.toastGPS.code == GPS.error.error) return;
                var err = GPS.error.error + "...";
                switch (GPS.error.codigo) {
                  case null:
                  case 0:
                    $.toastGPS.image = "/images/own/48x48/no_gps.png";
                    $.toastGPS.message = "GPS desactivado o no se encuentra señal GPS válida...";
                    $.toastGPS.configure = "true";
                    break;

                  case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
                    $.toastGPS.image = "/images/own/48x48/gps_noaccess.png";
                    $.toastGPS.message = err;
                    $.toastGPS.configure = "false";
                    break;

                  case Ti.Geolocation.ERROR_DENIED:
                    $.toastGPS.image = "/images/own/48x48/gps_noaccess.png";
                    $.toastGPS.message = err;
                    $.toastGPS.configure = "false";
                    break;

                  case Ti.Geolocation.ERROR_NETWORK:
                    $.toastGPS.image = "/images/own/48x48/gps_noaccess.png";
                    $.toastGPS.message = err;
                    $.toastGPS.configure = "false";
                    break;

                  case Ti.Geolocation.ERROR_HEADING_FAILURE:
                    $.toastGPS.image = "/images/own/48x48/gps_noaccess.png";
                    $.toastGPS.message = err;
                    $.toastGPS.configure = "false";
                    break;

                  case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
                    $.toastGPS.image = "/images/own/48x48/gps_noaccess.png";
                    $.toastGPS.message = err;
                    $.toastGPS.configure = "false";
                    break;

                  case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
                    $.toastGPS.image = "/images/own/48x48/gps_noaccess.png";
                    $.toastGPS.message = err;
                    $.toastGPS.configure = "false";
                    break;

                  case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
                    $.toastGPS.image = "/images/own/48x48/gps_noaccess.png";
                    $.toastGPS.message = err;
                    $.toastGPS.configure = "false";
                }
                GPS.active = false;
            }
            $.toastGPS.visible = false == GPS.active ? true : false;
            $.centrarposicion.visible = true == GPS.active ? true : false;
            $.toastGPS.code = false == $.centrarposicion.visible ? GPS.error.error : null;
            MuestraKioscosMapa();
        } else $.centrarposicion.visible = false;
    };
    var open_view_mapa = function() {
        cambia_vista(1);
    };
    var open_view_lista = function() {
        cambia_vista(2);
    };
    var obtengpsyverificaestatus = function() {
        if (1 == ventanaactiva) {
            ObtenerPosicionGPS();
            VerificaGPS();
        }
    }, open = function() {
        ObtenerPosicionGPS();
        openedflag = 1;
    }, focus = function() {
        focusedflag = 1;
        if (!locationAdded && locationCallback) {
            Titanium.Geolocation.addEventListener("location", locationCallback);
            locationAdded = true;
        }
        obtengpsyverificaestatus();
    }, blur = function() {
        if (locationAdded) {
            Titanium.Geolocation.removeEventListener("location", locationCallback);
            locationAdded = false;
        }
    }, close = function() {
        clearInterval(timer);
        timer = null;
        ventanaactiva = 0;
        db.close();
    }, locationCallback = function(e) {
        0 == openedflag && $.index.fireEvent("open");
        0 == focusedflag && $.index.fireEvent("focus");
        GPS.active = false;
        GPS.error.success = e.success ? e.success : null;
        GPS.error.codigo = e.code ? e.code : null;
        GPS.error.error = e.error ? e.error : null;
        GPS.error.mensaje = e.code ? traducircodigodeerror(e.code) : null;
        if (e.success && null == e.error) {
            GPS.geolocalization.longitude = e.coords.longitude;
            GPS.geolocalization.latitude = e.coords.latitude;
            GPS.geolocalization.altitude = e.coords.altitude;
            GPS.geolocalization.heading = e.coords.heading;
            GPS.geolocalization.accuracy = e.coords.accuracy;
            GPS.geolocalization.speed = e.coords.speed;
            GPS.geolocalization.timestamp = e.coords.timestamp;
            GPS.geolocalization.altitudeAccuracy = e.coords.altitudeAccuracy;
            GPS.active = true;
            return;
        }
        VerificaGPS();
        Ti.API.info("locationCallback : GPS ACTIVE: " + GPS.active + " - SUCCESS: " + GPS.error.success + " - CODIGO: " + GPS.error.codigo + " - ERROR: " + GPS.error.error + " - MENSAJE: " + GPS.error.mensaje);
    };
    Titanium.Geolocation.addEventListener("location", locationCallback);
    locationAdded = true;
    $.index.addEventListener("open", open);
    $.index.addEventListener("focus", focus);
    $.index.addEventListener("blur", blur);
    $.index.addEventListener("close", close);
    var db = null;
    var ObtenKioscosBDLocal = function() {
        db = Ti.Database.install(Alloy.Globals.databasepath + Alloy.Globals.databases.kioscos, "kioscos");
        return db.execute("SELECT id,descripcion,domicilio,lat,lng FROM tbl_kioscos");
    };
    var mapaIniciado = false, InicializaMapa = function() {
        if (GPS.active) {
            var region = {
                latitude: GPS.geolocalization.latitude,
                longitude: GPS.geolocalization.longitude,
                latitudeDelta: .025,
                longitudeDelta: .025
            };
            $.vista_mapa.region = region;
            mapaIniciado = true;
        }
    }, MuestraKioscosMapa = function() {
        if (!mapaIniciado) {
            InicializaMapa();
            var listakioscos = ObtenKioscosBDLocal();
            while (listakioscos.isValidRow()) {
                var anno = Ti.Map.createAnnotation({
                    animate: true,
                    image: "/images/own/32x32/pin_map.png",
                    pincolor: Ti.Map.ANNOTATION_RED,
                    latitude: listakioscos.fieldByName("lat"),
                    longitude: listakioscos.fieldByName("lng"),
                    subtitle: listakioscos.fieldByName("domicilio"),
                    title: listakioscos.fieldByName("descripcion"),
                    id: listakioscos.fieldByName("id")
                });
                $.vista_mapa.addAnnotation(anno);
                listakioscos.next();
            }
            listakioscos.close();
        }
        $.activityIndicator.hide();
    }, MuestraListaKioscos = function() {
        var listakioscos = ObtenKioscosBDLocal(), Data = [];
        var veces = 0;
        while (listakioscos.isValidRow()) {
            var row = Ti.UI.createTableViewRow({
                backgroundSelectedColor: "#cacaca",
                selectedColor: "#cccccc",
                layout: "vertical",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                top: 1,
                bottom: 1,
                rightImage: "/images/own/32x32/align_just.png",
                title: listakioscos.fieldByName("descripcion"),
                id_kiosco: listakioscos.fieldByName("id"),
                descripcion: listakioscos.fieldByName("descripcion"),
                domicilio: listakioscos.fieldByName("domicilio"),
                lat: listakioscos.fieldByName("lat"),
                lng: listakioscos.fieldByName("lng")
            });
            var Title = Ti.UI.createLabel({
                color: "black",
                font: {
                    fontFamily: "Arial",
                    fontSize: Alloy.Globals.defaultFontSize + 25,
                    fontWeight: "bold"
                },
                left: 5,
                top: 1,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                text: listakioscos.fieldByName("descripcion")
            });
            row.add(Title);
            var SubTitle = Ti.UI.createLabel({
                color: "#222",
                font: {
                    fontFamily: "Arial",
                    fontSize: Alloy.Globals.defaultFontSize + 10,
                    fontWeight: "normal"
                },
                left: 5,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                text: listakioscos.fieldByName("domicilio")
            });
            row.add(SubTitle);
            listakioscos.rowCount > veces && row.add(Ti.UI.createView({
                top: 1,
                bottom: 5,
                height: "1dp",
                width: "95%",
                backgroundColor: "#cacaca"
            }));
            Data.push(row);
            veces++;
            listakioscos.next();
        }
        $.lista_kioscos.data = Data;
        $.activityIndicator.hide();
    };
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
            e.index !== e.source.cancel && ConfigurarGPS();
        });
        dialog.show();
    };
    var centrarposicion = function() {
        InicializaMapa();
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
        $.activityIndicator.show();
        var id = e.rowData.id_kiosco;
        muestralistatramites(id);
    }, muestralistatramites = function(id) {
        GeneraListaTramites(id);
        $.vistatramites.zIndex = 10;
        $.vistatramites.visible = true;
    };
    var timer = setInterval(function() {
        obtengpsyverificaestatus();
        0 != ventanaactiva && Ti.API.info("timer ejecutado");
    }, 5e3);
    var click_map = function(evt) {
        if ("pin" != evt.clicksource) {
            $.activityIndicator.show();
            var id_kiosco = evt.annotation.id;
            muestralistatramites(id_kiosco);
        }
    }, ObtenTramitesenKioscosBDLocal = function(id_kiosco) {
        return db.execute("SELECT id,id_ficha_retys,descripcion FROM tbl_kioscos_tramites where id_kiosco = " + id_kiosco);
    }, GeneraListaTramites = function(id_kiosco) {
        var Data = [], listatramiteskioscos = ObtenTramitesenKioscosBDLocal(id_kiosco);
        var veces = 0;
        while (listatramiteskioscos.isValidRow()) {
            var row = Ti.UI.createTableViewRow({
                backgroundSelectedColor: "#cacaca",
                selectedColor: "#cccccc",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                layout: "vertical",
                rightImage: "/images/own/16x16/image_text.png",
                top: 1,
                bottom: 1,
                title: listatramiteskioscos.fieldByName("descripcion"),
                id_tramite: listatramiteskioscos.fieldByName("id"),
                id_ficha_retys: listatramiteskioscos.fieldByName("id_ficha_retys"),
                descripcion: listatramiteskioscos.fieldByName("descripcion")
            });
            var Title = Ti.UI.createLabel({
                color: "Black",
                font: {
                    fontFamily: "Arial",
                    fontSize: Alloy.Globals.defaultFontSize + 12
                },
                left: 2,
                top: 2,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                text: listatramiteskioscos.fieldByName("descripcion")
            });
            row.add(Title);
            listatramiteskioscos.rowCount > veces && row.add(Ti.UI.createView({
                top: 1,
                bottom: 5,
                height: "1dp",
                width: "95%",
                backgroundColor: "#cacaca"
            }));
            Data.push(row);
            veces++;
            listatramiteskioscos.next();
        }
        $.lista_tramiteskioscos.data = Data;
        $.activityIndicator.hide();
    }, click_tramitekiosco = function(e) {
        if (verificasihayinternet()) {
            var id = e.rowData.id_ficha_retys;
            $.activityIndicator.show();
            DespliegaFichaRETyS(id);
        } else Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Aceptar" ],
            message: "Para mostrar la ficha RETyS del trámite es necesario tener servicio de Internet activo...",
            title: "Conexión a Internet"
        }).show();
    };
    $.index.addEventListener("android:back", function() {
        $.vistaficharetys.visible ? $.vistaficharetys.visible = false : $.vistatramites.visible ? $.vistatramites.visible = false : $.index.close();
    });
    var Closesubviewtramites = function() {
        $.vistatramites.visible = false;
    }, Closesubviewficha = function() {
        $.vistaficharetys.visible = false;
    };
    var DespliegaFichaRETyS = function(id_ficha_retys) {
        ConsultaFichaRETyS(id_ficha_retys, function(data) {
            function CrearLabelTitulo(label) {
                var TitleLabel = Ti.UI.createLabel({
                    color: "black",
                    font: {
                        fontFamily: "Helveltica",
                        fontSize: "18dp",
                        fontStyle: "normal",
                        fontWeight: "bold"
                    },
                    width: "27%",
                    height: Ti.UI.SIZE,
                    left: 1,
                    text: label
                });
                return TitleLabel;
            }
            function CrearLabelData(obj) {
                var rowdata = Ti.UI.createView({
                    layout: "vertical",
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE
                }), dato = false;
                if ("object" == typeof obj) {
                    for (var item in obj) if (obj.length > 0) {
                        var DataLabel = Ti.UI.createLabel({
                            color: "black",
                            font: {
                                fontFamily: "Helveltica",
                                fontSize: "18dp",
                                fontStyle: "normal"
                            },
                            left: 5,
                            width: "69%",
                            height: Ti.UI.SIZE,
                            text: obj[item]
                        });
                        rowdata.add(DataLabel);
                        dato = true;
                    }
                } else if (obj.length > 0) {
                    var DataLabel = Ti.UI.createLabel({
                        color: "black",
                        font: {
                            fontFamily: "Helveltica",
                            fontSize: "18dp",
                            fontStyle: "normal"
                        },
                        left: 5,
                        width: "69%",
                        height: Ti.UI.SIZE,
                        text: obj
                    });
                    rowdata.add(DataLabel);
                    dato = true;
                }
                if (!dato) {
                    var DataLabel = Ti.UI.createLabel({
                        color: "black",
                        font: {
                            fontFamily: "Helveltica",
                            fontSize: "18dp",
                            fontStyle: "normal"
                        },
                        left: 5,
                        width: "69%",
                        height: Ti.UI.SIZE,
                        text: "---"
                    });
                    rowdata.add(DataLabel);
                }
                return rowdata;
            }
            function CreaBloque(titulo, data) {
                var vista = Ti.UI.createView({
                    layout: "horizontal",
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE
                });
                vista.add(CrearLabelTitulo(titulo));
                vista.add(CrearLabelData(data));
                return vista;
            }
            for (var d = $.scrllvw.children.length - 1; d >= 0; d--) $.scrllvw.remove($.scrllvw.children[d]);
            var data_ficha_retys = Ti.UI.createView({
                layout: "vertical",
                left: 5,
                right: 5,
                top: 5,
                bottom: 5,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            });
            data_ficha_retys.add(CreaBloque("Nombre", data.nombre));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Descripción", data.descripcion));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Tipo", data.tipo));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Fecha de validación", data.fecha_validacion));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("¿A quién va dirigido?", data.a_quien_va_dirigido));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Requisitos", data.requisitos));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Documentos", data.documentos));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Observaciones", data.observaciones));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Costos", data.costos));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Nota de Costos", data.costos_nota));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Formas de pago", data.forma_pago));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Pasos a seguir para realizar el trámite", data.pasos));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Tiempo de respuesta", data.tiempo_respuesta));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Formatos autorizados", data.formatos_autorizados));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Medios de impugnación", data.medios_impugnacion));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Afirmativa Ficta", data.Afirmativa_Ficta));
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            var rowdata = Ti.UI.createView({
                layout: "vertical",
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            });
            rowdata.add(CrearLabelData("Ubicación: " + data.responsable.ubicacion));
            rowdata.add(CrearLabelData("Dependencia: " + data.responsable.dependencia));
            rowdata.add(CrearLabelData("Responsable: " + data.responsable.responsable));
            rowdata.add(CrearLabelData("Correo: " + data.responsable.correo));
            rowdata.add(CrearLabelData("Teléfonos: " + data.responsable.telefonos));
            rowdata.add(CrearLabelData("Extension: " + data.responsable.extension));
            rowdata.add(CrearLabelData("Horario de oficina: " + data.responsable.horario_oficina));
            var vista = Ti.UI.createView({
                layout: "horizontal",
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            });
            vista.add(CrearLabelTitulo("Responsable"));
            vista.add(rowdata);
            data_ficha_retys.add(vista);
            data_ficha_retys.add(Ti.UI.createView({
                top: 5,
                bottom: 5,
                height: "1dp",
                width: "99%",
                backgroundColor: "#cacaca"
            }));
            data_ficha_retys.add(CreaBloque("Normatividad", data.normatividad));
            $.scrllvw.add(data_ficha_retys);
            $.vistaficharetys.zIndex = 11;
            $.vistaficharetys.visible = true;
            $.activityIndicator.hide();
        });
    };
    var ConsultaFichaRETyS = function(id_ficha_retys, callback) {
        var nodata = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Aceptar" ],
            message: "No se encontró información en RETyS para éste trámite...",
            title: "Ficha RETyS"
        }), errorresponse = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Aceptar" ],
            message: "Ocurrió un problema al intentar obtener la ficha RETyS, favor de intentarlo más tarde...",
            title: "Ficha RETyS"
        }), sendit = Ti.Network.createHTTPClient({
            timeout: 15e3,
            onerror: function(e) {
                Ti.API.debug(e.error);
                errorresponse.show();
                $.activityIndicator.hide();
            },
            onload: function() {
                var json = null;
                try {
                    var responsemime = this.responseData.mimeType;
                    if ("text/html" == responsemime) {
                        errorresponse.show();
                        return;
                    }
                    json = JSON.parse(this.responseText);
                } catch (e) {
                    Ti.API.debug(e.message);
                    errorresponse.show();
                }
                0 == json.length ? nodata.show() : 1 == json.exito ? callback(json) : nodata.show();
                $.activityIndicator.hide();
            }
        });
        if (id_ficha_retys) {
            var format = "json", url = "http://10.10.20.132/REST_retys/index.php/servicio/consulta_tramite/format/" + format + "/" + id_ficha_retys;
            sendit.open("GET", url);
            sendit.cache = false;
            sendit.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            sendit.send();
        } else {
            nodata.show();
            $.activityIndicator.hide();
        }
    };
    cambia_vista(1);
    $.index.open();
    __defers["$.__views.btn_mapa!click!open_view_mapa"] && $.__views.btn_mapa.addEventListener("click", open_view_mapa);
    __defers["$.__views.__alloyId7!click!open_view_lista"] && $.__views.__alloyId7.addEventListener("click", open_view_lista);
    __defers["$.__views.vista_mapa!click!click_map"] && $.__views.vista_mapa.addEventListener("click", click_map);
    __defers["$.__views.lista_kioscos!click!click_opc"] && $.__views.lista_kioscos.addEventListener("click", click_opc);
    __defers["$.__views.__alloyId14!click!Closesubviewtramites"] && $.__views.__alloyId14.addEventListener("click", Closesubviewtramites);
    __defers["$.__views.lista_tramiteskioscos!click!click_tramitekiosco"] && $.__views.lista_tramiteskioscos.addEventListener("click", click_tramitekiosco);
    __defers["$.__views.__alloyId19!click!Closesubviewficha"] && $.__views.__alloyId19.addEventListener("click", Closesubviewficha);
    __defers["$.__views.toastINTERNET!click!toastNotification"] && $.__views.toastINTERNET.addEventListener("click", toastNotification);
    __defers["$.__views.toastGPS!click!toastNotification"] && $.__views.toastGPS.addEventListener("click", toastNotification);
    __defers["$.__views.centrarposicion!click!centrarposicion"] && $.__views.centrarposicion.addEventListener("click", centrarposicion);
    __defers["$.__views.centrarposicion!longpress!centrarposicioninfo"] && $.__views.centrarposicion.addEventListener("longpress", centrarposicioninfo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;