var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.defaultFontSize = 10;

Alloy.Globals.databasepath = "/databases/";

Alloy.Globals.databases = {
    kioscos: "kioscos.sqlite"
};

Alloy.createController("index");