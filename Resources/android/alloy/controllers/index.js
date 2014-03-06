function Controller() {
    function INERNETDialogOptionClick(e) {
        switch (e.index) {
          case 0:        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        exitOnClose: true,
        title: "Gobierno del Estado de Colima",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.header = Alloy.createController("header", {
        id: "header",
        __parentSymbol: $.__views.index
    });
    $.__views.header.setParent($.__views.index);
    $.__views.divider_header = Alloy.createController("divider", {
        id: "divider_header",
        __parentSymbol: $.__views.index
    });
    $.__views.divider_header.setParent($.__views.index);
    $.__views.body = Alloy.createController("body", {
        id: "body",
        __parentSymbol: $.__views.index
    });
    $.__views.body.setParent($.__views.index);
    var __alloyId4 = [];
    __alloyId4.push("Aceptar");
    $.__views.INTERNETDialog = Ti.UI.createAlertDialog({
        buttonNames: __alloyId4,
        id: "INTERNETDialog",
        title: "Conexión a Internet",
        message: "Es necesario contar con plan de datos movil o internet para usar la aplicación, favor de establecer conexión a internet",
        cancel: "0"
    });
    INERNETDialogOptionClick ? $.__views.INTERNETDialog.addEventListener("click", INERNETDialogOptionClick) : __defers["$.__views.INTERNETDialog!click!INERNETDialogOptionClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.Database.install("/mysql.sqlite", "_alloy_");
    $.index.addEventListener("open", function() {
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            Titanium.API.info(" no connection ");
            $.INTERNETDialog.show();
        } else Titanium.API.info(" connection present ");
    });
    $.index.open();
    __defers["$.__views.INTERNETDialog!click!INERNETDialogOptionClick"] && $.__views.INTERNETDialog.addEventListener("click", INERNETDialogOptionClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;