Ti.Database.install('/mysql.sqlite', '_alloy_');

$.index.addEventListener('open',function(){
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
	   Titanium.API.info(' no connection ');
	   $.INTERNETDialog.show();	   
	} else {
	   Titanium.API.info(' connection present ');
	}	
});

function INERNETDialogOptionClick(e){
	switch (e.index) {
		case 0:
			//$.index.close();
	    break;
	}    
};

$.index.open();
