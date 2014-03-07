exports.definition = {
		config:{
			
			adapter:{
				"type":"sql",
				"collection_name":"fighters",
				"db_file": "/databases/myapp.sqlite",
				"db_name": "fighters",
				"idAttribute": "id",
				"remoteBackup":false
			}
		}
};