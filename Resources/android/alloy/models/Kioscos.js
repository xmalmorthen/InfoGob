exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "kioscos",
            db_file: "/kioscos.sqlite",
            db_name: "tbl_kioscos",
            idAttribute: "id",
            remoteBackup: false
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("kioscos", exports.definition, []);

collection = Alloy.C("kioscos", exports.definition, model);

exports.Model = model;

exports.Collection = collection;