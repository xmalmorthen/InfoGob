function Controller() {
    function showClickEventInfo(e, islongclick) {
        var index = e.index;
        var rowdata = e.rowData;
        if (islongclick) {
            var descripcion = rowdata.descripcion;
            Titanium.UI.createAlertDialog({
                title: "Descripción",
                message: descripcion
            }).show();
        } else switch (index) {
          case 0:
            Alloy.createController("/options/kioscos").getView().open();
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
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menue/index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Menu_Principal = Ti.UI.createTableView({
        top: 10,
        id: "Menu_Principal"
    });
    $.__views.Menu_Principal && $.addTopLevelView($.__views.Menu_Principal);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var defaultFontSize = 10;
    var tableData = [];
    var Opciones = [ {
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
            selectedBackgroundColor: "#cacaca",
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
            width: 70,
            height: 70,
            bottom: 10
        });
        row.add(image);
        var Title = Ti.UI.createLabel({
            color: "#576996",
            font: {
                fontFamily: "Arial",
                fontSize: defaultFontSize + 14,
                fontWeight: "bold"
            },
            text: Opciones[i].title,
            left: 85,
            top: 6,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        row.add(Title);
        var SubTitle = Ti.UI.createLabel({
            color: "#222",
            font: {
                fontFamily: "Arial",
                fontSize: defaultFontSize + 1,
                fontWeight: "normal"
            },
            text: Opciones[i].subtitle,
            left: 85,
            top: 35,
            width: Ti.UI.SIZE
        });
        row.add(SubTitle);
        tableData.push(row);
    }
    $.Menu_Principal.data = tableData;
    $.Menu_Principal.addEventListener("click", function(e) {
        showClickEventInfo(e);
    });
    $.Menu_Principal.addEventListener("longclick", function(e) {
        showClickEventInfo(e, true);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;