function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "options/row_table_kiosco";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row_table_kiosco = Ti.UI.createTableViewRow({
        id: "row_table_kiosco"
    });
    $.__views.row_table_kiosco && $.addTopLevelView($.__views.row_table_kiosco);
    $.__views.descripcion = Ti.UI.createLabel({
        id: "descripcion",
        text: "undefined" != typeof $model.__transform["descripcion"] ? $model.__transform["descripcion"] : $model.get("descripcion")
    });
    $.__views.row_table_kiosco.add($.__views.descripcion);
    $.__views.domicilio = Ti.UI.createLabel({
        id: "domicilio",
        text: "undefined" != typeof $model.__transform["domicilio"] ? $model.__transform["domicilio"] : $model.get("domicilio")
    });
    $.__views.row_table_kiosco.add($.__views.domicilio);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $model && ($.row.model = $model.toJSON());
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;