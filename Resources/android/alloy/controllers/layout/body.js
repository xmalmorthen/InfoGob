function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "layout/body";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.body = Ti.UI.createView({
        apiName: "Ti.UI.View",
        id: "body",
        classes: []
    });
    $.__views.body && $.addTopLevelView($.__views.body);
    $.__views.background_image = Ti.UI.createImageView({
        image: Alloy.Globals.Theme.backgroundImage,
        height: Alloy.Globals.Imagen.background,
        width: Alloy.Globals.Imagen.background,
        right: 2,
        bottom: 2,
        opacity: .5,
        apiName: "Ti.UI.ImageView",
        id: "background_image",
        classes: []
    });
    $.__views.body.add($.__views.background_image);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "100%",
        top: 10,
        apiName: "Ti.UI.View",
        classes: [ "body" ],
        id: "__alloyId0"
    });
    $.__views.body.add($.__views.__alloyId0);
    $.__views.menue = Alloy.createController("/menue/menue", {
        apiName: "Alloy.Require",
        id: "menue",
        classes: [],
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.menue.setParent($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;