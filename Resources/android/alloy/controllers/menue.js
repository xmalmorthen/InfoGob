function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menue";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.Menu_Principal = Ti.UI.createTableView({
        top: 10,
        id: "Menu_Principal"
    });
    $.__views.Menu_Principal && $.addTopLevelView($.__views.Menu_Principal);
    click_opc ? $.__views.Menu_Principal.addEventListener("click", click_opc) : __defers["$.__views.Menu_Principal!click!click_opc"] = true;
    lng_press_opc ? $.__views.Menu_Principal.addEventListener("longpress", lng_press_opc) : __defers["$.__views.Menu_Principal!longpress!lng_press_opc"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Data = [], Image_Size = 70, Opciones = [ {
        title: "Kioscos de Gobierno",
        subtitle: "Ubica en el mapa los Kioscos más cercanos a tu ubicación...",
        description: "Mediante el posicionamiento GPS, permite ubicar los distintos Kioscos de Gobierno, en caso de no tener GPS activo se mostrará una lista con las ubicaciones...",
        image: "appicon.png"
    }, {
        title: "Módulos CURP",
        subtitle: "Ubica en el mapa los diferentes módulos de atención curp más cercanos a tu ubicación...",
        description: "Descrioción aqui...",
        image: "appicon.png"
    }, {
        title: "Zona Internet",
        subtitle: "Ubica en el mapa los espacios con internet gratuito mas cercanos a tu ubicación...",
        description: "Descrioción aqui...",
        image: "appicon.png"
    }, {
        title: "Directorio Integral",
        subtitle: "Realiza busquedas en el Directorio Integral de Gobierno del Estado de Colima...",
        description: "Descrioción aqui...",
        image: "appicon.png"
    }, {
        title: "RETyS",
        subtitle: "Consulta el Registro Estatal de Trámites y Servicios...",
        description: "Descrioción aqui...",
        image: "appicon.png"
    } ];
    for (var i = 0; Opciones.length > i; i++) {
        var row = Ti.UI.createTableViewRow({
            backgroundSelectedColor: "#cacaca",
            selectedColor: "#cccccc",
            rowIndex: i,
            descripcion: Opciones[i].description,
            height: Ti.UI.SIZE,
            title: Opciones[i].title
        });
        var image = Ti.UI.createImageView({
            image: "/" + Opciones[i].image,
            left: 10,
            top: 5,
            width: Image_Size,
            height: Image_Size,
            bottom: 10
        });
        row.add(image);
        var Title = Ti.UI.createLabel({
            color: "#576996",
            font: {
                fontFamily: "Arial",
                fontSize: Alloy.Globals.defaultFontSize + 14,
                fontWeight: "bold"
            },
            text: Opciones[i].title,
            left: Image_Size + 15,
            top: Image_Size - (Alloy.Globals.defaultFontSize + 14) - (Alloy.Globals.defaultFontSize + 1) - 10,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        row.add(Title);
        var SubTitle = Ti.UI.createLabel({
            color: "#222",
            font: {
                fontFamily: "Arial",
                fontSize: Alloy.Globals.defaultFontSize + 1,
                fontWeight: "normal"
            },
            text: Opciones[i].subtitle,
            left: Image_Size + 15,
            top: Image_Size - (Alloy.Globals.defaultFontSize + 1) - 10 + 4,
            width: Ti.UI.SIZE
        });
        row.add(SubTitle);
        Data.push(row);
    }
    $.Menu_Principal.data = Data;
    var click_opc = function(e) {
        var index = e.index;
        switch (index) {
          case 0:
            Alloy.createController("/options/kioscos/index").getView().open();
            break;

          case 1:
            alert("CURP");
            break;

          case 2:
            alert("Internet");
            break;

          case 3:
            alert("DI");
            break;

          case 4:
            alert("RETyS");
            break;

          default:
            alert("Desconocido");
        }
    };
    var lng_press_opc = function(e) {
        var rowdata = (e.index, e.rowData), descripcion = rowdata.descripcion;
        Ti.UI.createAlertDialog({
            title: "Info[Gob]",
            message: descripcion,
            buttonNames: [ "Cerrar" ],
            cancel: 0
        }).show();
    };
    __defers["$.__views.Menu_Principal!click!click_opc"] && $.__views.Menu_Principal.addEventListener("click", click_opc);
    __defers["$.__views.Menu_Principal!longpress!lng_press_opc"] && $.__views.Menu_Principal.addEventListener("longpress", lng_press_opc);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;