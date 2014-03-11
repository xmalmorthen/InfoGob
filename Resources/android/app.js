function defaultFontSize() {
    var defaultFontSize = 10;
    defaultFontSize = 10;
    return defaultFontSize;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.defaultFontSize = defaultFontSize();

Alloy.Globals.databasepath = "/databases/";

Alloy.Globals.databases = {
    kioscos: "kioscos.sqlite"
};

Alloy.createController("index");