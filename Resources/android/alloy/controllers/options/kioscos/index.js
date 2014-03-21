function Controller() {
    function cambia_vista(opc) {
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
        opacity: .7,
        id: "botonera_kioscos"
    });
    $.__views.__alloyId3.add($.__views.botonera_kioscos);
    $.__views.btn_mapa = Ti.UI.createView({
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#929090",
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
        image: "/images/own/48x48/map_marker.png",
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
        backgroundColor: "#929090",
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
        image: "/images/own/48x48/list_ingredients.png",
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
    click_map ? $.__views.vista_mapa.addEventListener("click", click_map) : __defers["$.__views.vista_mapa!click!click_map"] = true;
    $.__views.vista_lista = Ti.UI.createView({
        backgroundColor: "white",
        zIndex: 1,
        id: "vista_lista"
    });
    $.__views.content_kioscos.add($.__views.vista_lista);
    $.__views.lista_kioscos = Ti.UI.createTableView({
        top: 80,
        left: 5,
        id: "lista_kioscos"
    });
    $.__views.vista_lista.add($.__views.lista_kioscos);
    click_opc ? $.__views.lista_kioscos.addEventListener("click", click_opc) : __defers["$.__views.lista_kioscos!click!click_opc"] = true;
    $.__views.vistatramites = Ti.UI.createView({
        width: "100%",
        height: "100%",
        visible: false,
        id: "vistatramites"
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
        id: "subviewchildren"
    });
    $.__views.vistatramites.add($.__views.subviewchildren);
    $.__views.__alloyId11 = Ti.UI.createView({
        width: "100%",
        height: Ti.UI.SIZE,
        id: "__alloyId11"
    });
    $.__views.subviewchildren.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontFamily: "Helveltica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        left: 5,
        top: 5,
        text: "Lista de trámites...",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createImageView({
        top: "7",
        right: "10",
        image: "/images/own/32x32/delete.png",
        id: "__alloyId13"
    });
    $.__views.__alloyId11.add($.__views.__alloyId13);
    Closesubviewtramites ? $.__views.__alloyId13.addEventListener("click", Closesubviewtramites) : __defers["$.__views.__alloyId13!click!Closesubviewtramites"] = true;
    $.__views.__alloyId14 = Ti.UI.createView({
        top: "1dp",
        height: "1dp",
        width: "70%",
        left: "0dp",
        backgroundColor: "#000",
        id: "__alloyId14"
    });
    $.__views.subviewchildren.add($.__views.__alloyId14);
    $.__views.lista_tramiteskioscos = Ti.UI.createTableView({
        left: 5,
        id: "lista_tramiteskioscos"
    });
    $.__views.subviewchildren.add($.__views.lista_tramiteskioscos);
    click_tramitekiosco ? $.__views.lista_tramiteskioscos.addEventListener("click", click_tramitekiosco) : __defers["$.__views.lista_tramiteskioscos!click!click_tramitekiosco"] = true;
    $.__views.vistaficharetys = Ti.UI.createView({
        width: "100%",
        height: "100%",
        visible: false,
        id: "vistaficharetys"
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
        id: "subviewficharetyschildren"
    });
    $.__views.vistaficharetys.add($.__views.subviewficharetyschildren);
    $.__views.__alloyId15 = Ti.UI.createView({
        width: "100%",
        height: Ti.UI.SIZE,
        id: "__alloyId15"
    });
    $.__views.subviewficharetyschildren.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontFamily: "Helveltica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        left: 5,
        top: 5,
        text: "Ficha RETyS",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createImageView({
        top: "7",
        right: "10",
        image: "/images/own/32x32/delete.png",
        id: "__alloyId17"
    });
    $.__views.__alloyId15.add($.__views.__alloyId17);
    Closesubviewficha ? $.__views.__alloyId17.addEventListener("click", Closesubviewficha) : __defers["$.__views.__alloyId17!click!Closesubviewficha"] = true;
    $.__views.__alloyId18 = Ti.UI.createView({
        top: "1dp",
        height: "1dp",
        width: "70%",
        left: "0dp",
        backgroundColor: "#000",
        id: "__alloyId18"
    });
    $.__views.subviewficharetyschildren.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "vertical",
        left: "5",
        right: "5",
        top: "5",
        bottom: "5",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId19"
    });
    $.__views.subviewficharetyschildren.add($.__views.__alloyId19);
    $.__views.tblvwficha = Ti.UI.createTableView({
        id: "tblvwficha"
    });
    $.__views.__alloyId19.add($.__views.tblvwficha);
    $.__views.__alloyId20 = Ti.UI.createView({
        top: 5,
        right: 5,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId20"
    });
    $.__views.index.add($.__views.__alloyId20);
    $.__views.toastINTERNET = Ti.UI.createImageView({
        width: 30,
        height: 34,
        id: "toastINTERNET",
        image: "/images/own/48x48/no_internet.png",
        message: "No conectado a internet...",
        configure: "false",
        visible: "false"
    });
    $.__views.__alloyId20.add($.__views.toastINTERNET);
    toastNotification ? $.__views.toastINTERNET.addEventListener("click", toastNotification) : __defers["$.__views.toastINTERNET!click!toastNotification"] = true;
    $.__views.toastGPS = Ti.UI.createImageView({
        width: 38,
        height: 38,
        id: "toastGPS",
        left: "10",
        message: "Servicio de posicionamiento no habilitado o se ha perdio la conexión al GPS...",
        configure: "true",
        code: "null",
        visible: "false"
    });
    $.__views.__alloyId20.add($.__views.toastGPS);
    toastNotification ? $.__views.toastGPS.addEventListener("click", toastNotification) : __defers["$.__views.toastGPS!click!toastNotification"] = true;
    $.__views.__alloyId21 = Ti.UI.createView({
        bottom: 5,
        right: 5,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId21"
    });
    $.__views.index.add($.__views.__alloyId21);
    $.__views.centrarposicion = Ti.UI.createImageView({
        width: 38,
        height: 38,
        id: "centrarposicion",
        image: "/images/own/48x48/target.png",
        message: "Presione para centrar su posición en el mapa...",
        visible: "false"
    });
    $.__views.__alloyId21.add($.__views.centrarposicion);
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
    }, MuestraListaKioscos = function() {
        var listakioscos = ObtenKioscosBDLocal(), Data = [];
        var veces = 0;
        while (listakioscos.isValidRow()) {
            var row = Ti.UI.createTableViewRow({
                backgroundSelectedColor: "#cacaca",
                selectedColor: "#cccccc",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                layout: "vertical",
                top: 5,
                bottom: 5,
                hasDetail: true,
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
            veces++;
            5 == veces && listakioscos.next();
        }
        $.lista_kioscos.data = Data;
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
            var id_kiosco = evt.annotation.id;
            muestralistatramites(id_kiosco);
        }
    }, ObtenTramitesenKioscosBDLocal = function(id_kiosco) {
        return db.execute("SELECT id,id_ficha_retys,descripcion FROM tbl_kioscos_tramites where id_kiosco = " + id_kiosco);
    }, GeneraListaTramites = function(id_kiosco) {
        var Data = [], listatramiteskioscos = ObtenTramitesenKioscosBDLocal(id_kiosco);
        while (listatramiteskioscos.isValidRow()) {
            var row = Ti.UI.createTableViewRow({
                backgroundSelectedColor: "#cacaca",
                selectedColor: "#cccccc",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                layout: "vertical",
                hasChild: true,
                title: listatramiteskioscos.fieldByName("descripcion"),
                id_tramite: listatramiteskioscos.fieldByName("id"),
                id_ficha_retys: listatramiteskioscos.fieldByName("id_ficha_retys"),
                descripcion: listatramiteskioscos.fieldByName("descripcion")
            });
            var Title = Ti.UI.createLabel({
                color: "Black",
                font: {
                    fontFamily: "Arial",
                    fontSize: Alloy.Globals.defaultFontSize + 14
                },
                left: 2,
                top: 2,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                text: listatramiteskioscos.fieldByName("descripcion")
            });
            row.add(Title);
            Data.push(row);
            listatramiteskioscos.next();
        }
        $.lista_tramiteskioscos.data = Data;
    }, click_tramitekiosco = function(e) {
        if (verificasihayinternet()) {
            var id = e.rowData.id_ficha_retys;
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
    var DespliegaFichaRETyS = function() {
        var inputData = [ {
            header: "Fecha de validación",
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            header: "Requisitos",
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            header: "Costos",
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            header: "Pasos a seguir para realizar el trámite",
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            header: "Tiempo de respuesta",
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        } ];
        var data = [];
        for (var i = 0; inputData.length > i; i++) {
            var vista = Ti.UI.createView({
                backgroundColor: "#999",
                height: 25
            });
            var headerLabel = Ti.UI.createLabel({
                font: {
                    fontFamily: "Helvetica Neue",
                    fontSize: 19,
                    fontWeight: "bold"
                },
                text: inputData[i].header,
                color: "#222",
                textAlign: "left",
                top: 0,
                left: 5,
                width: Ti.UI.SIZE,
                height: 25
            });
            vista.add(headerLabel);
            data[i] = Ti.UI.createTableViewSection({
                headerView: vista
            });
            data[i].add(Ti.UI.createTableViewRow({
                title: inputData[i].title
            }));
        }
        $.tblvwficha.data = data;
        $.vistaficharetys.zIndex = 11;
        $.vistaficharetys.visible = true;
    };
    cambia_vista(1);
    $.index.open();
    __defers["$.__views.btn_mapa!click!open_view_mapa"] && $.__views.btn_mapa.addEventListener("click", open_view_mapa);
    __defers["$.__views.__alloyId7!click!open_view_lista"] && $.__views.__alloyId7.addEventListener("click", open_view_lista);
    __defers["$.__views.vista_mapa!click!click_map"] && $.__views.vista_mapa.addEventListener("click", click_map);
    __defers["$.__views.lista_kioscos!click!click_opc"] && $.__views.lista_kioscos.addEventListener("click", click_opc);
    __defers["$.__views.__alloyId13!click!Closesubviewtramites"] && $.__views.__alloyId13.addEventListener("click", Closesubviewtramites);
    __defers["$.__views.lista_tramiteskioscos!click!click_tramitekiosco"] && $.__views.lista_tramiteskioscos.addEventListener("click", click_tramitekiosco);
    __defers["$.__views.__alloyId17!click!Closesubviewficha"] && $.__views.__alloyId17.addEventListener("click", Closesubviewficha);
    __defers["$.__views.toastINTERNET!click!toastNotification"] && $.__views.toastINTERNET.addEventListener("click", toastNotification);
    __defers["$.__views.toastGPS!click!toastNotification"] && $.__views.toastGPS.addEventListener("click", toastNotification);
    __defers["$.__views.centrarposicion!click!centrarposicion"] && $.__views.centrarposicion.addEventListener("click", centrarposicion);
    __defers["$.__views.centrarposicion!longpress!centrarposicioninfo"] && $.__views.centrarposicion.addEventListener("longpress", centrarposicioninfo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;