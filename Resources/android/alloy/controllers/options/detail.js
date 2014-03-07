function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "options/detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.detail = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: true,
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    $.__views.__alloyId6 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId6"
    });
    $.__views.detail.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.name = Ti.UI.createLabel({
        top: "10dp",
        font: {
            fontSize: "24dp",
            fontWeight: "bold"
        },
        id: "name",
        text: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.__alloyId7.add($.__views.name);
    $.__views.nickname = Ti.UI.createLabel({
        top: "10dp",
        font: {
            fontSize: "16dp",
            fonWeight: "normal"
        },
        id: "nickname",
        text: "undefined" != typeof $model.__transform["nickname"] ? $model.__transform["nickname"] : $model.get("nickname")
    });
    $.__views.__alloyId7.add($.__views.nickname);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    if (args.$model) {
        Ti.API.info("model =" + JSON.stringify(args.$model));
        args.$model.toJSON();
    } else alert("data not passed");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;