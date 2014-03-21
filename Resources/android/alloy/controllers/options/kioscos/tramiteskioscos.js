function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "options/kioscos/tramiteskioscos";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.tramiteskioscos = Ti.UI.createView({
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#cacaca",
        width: "90%",
        height: "90%",
        id: "tramiteskioscos"
    });
    $.__views.tramiteskioscos && $.addTopLevelView($.__views.tramiteskioscos);
    $.__views.lista_tramiteskioscos = Ti.UI.createTableView({
        id: "lista_tramiteskioscos"
    });
    $.__views.tramiteskioscos.add($.__views.lista_tramiteskioscos);
    click_opc ? $.__views.lista_tramiteskioscos.addEventListener("click", click_opc) : __defers["$.__views.lista_tramiteskioscos!click!click_opc"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, click_opc = (args.id_kiosco || "", function() {
        alert("click");
    });
    __defers["$.__views.lista_tramiteskioscos!click!click_opc"] && $.__views.lista_tramiteskioscos.addEventListener("click", click_opc);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;