exports.definition = {
  	config:{
	   adapter:{
		    "type":"sql",
		    "collection_name":"kioscos",
		    "db_file": "/kioscos.sqlite",
		    "db_name": "tbl_kioscos",
		    "idAttribute": "id",
		    "remoteBackup":false
	   }
	}
};