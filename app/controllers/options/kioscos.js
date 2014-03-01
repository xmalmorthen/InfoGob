var locationAdded = false;
var GPGGoActivate = false; 

$.kioscos.openedflag = 0 ;
$.kioscos.focusedflag = 0;

function translateErrorCode(code) {
	if (code == null) {
		return null;
	}
	switch (code) {
		case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
			return "Location unknown";
		case Ti.Geolocation.ERROR_DENIED:
			return "Access denied";
		case Ti.Geolocation.ERROR_NETWORK:
			return "Network error";
		case Ti.Geolocation.ERROR_HEADING_FAILURE:
			return "Failure to detect heading";
		case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
			return "Region monitoring access denied";
		case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
			return "Region monitoring access failure";
		case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
			return "Region monitoring setup delayed";
	}
}

var locationCallback = function(e){
	if($.kioscos.openedflag == 0 ){
		Ti.API.info('firing open event');
		$.kioscos.fireEvent('open');
	}
	if($.kioscos.focusedflag == 0){
		Ti.API.info('firing focus event');
		$.kioscos.fireEvent('focus');
	}
	if (!e.success || e.error)
	{		
		var msg = "Error gps: " + JSON.stringify(e.error) + " error code: " + e.code;
		
		if (e.code == 0) {	
			Titanium.Geolocation.removeEventListener('location',locationCallback);			
			if (!GPGGoActivate) {
				$.kioscos.openedflag = 0;
				$.GPSDialog.show();
			}
		}
		//Titanium.UI.createAlertDialog({title:'Kioscos de Gobierno', message:msg}).show();
		//Ti.API.info("Code translation: "+translateErrorCode(e.code));
		return;
	}

	var longitude = e.coords.longitude;
	var latitude = e.coords.latitude;
	var altitude = e.coords.altitude;
	var heading = e.coords.heading;
	var accuracy = e.coords.accuracy;
	var speed = e.coords.speed;
	var timestamp = e.coords.timestamp;
	var altitudeAccuracy = e.coords.altitudeAccuracy;

	//Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);	
};

Ti.Geolocation.preferredProvider = "gps";

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

$.kioscos.addEventListener('open', function() {
	$.kioscos.openedflag = 1;		
	Titanium.Geolocation.addEventListener('location',locationCallback);
	locationAdded = true;
});

$.kioscos.addEventListener('blur', function() {	
	if (locationAdded) {
		Titanium.Geolocation.removeEventListener('location', locationCallback);
		locationAdded = false;
	}
});

$.kioscos.addEventListener('focus', function(){
	$.kioscos.focusedflag = 1;
	if (!locationAdded && locationCallback) {
		Ti.API.info("adding location callback on resume");
		Titanium.Geolocation.addEventListener('location', locationCallback);
		locationAdded = true;
	}
});

function GPSDialogOptionClick(e){
	switch (e.index) {
		case 0:
		    alert('Ayuda');
		    break;
		case 1:
		    alert('Cancelar');
		    break;		    
		case 2:
		    alert('Aceptar');
		    GPGGoActivate = true;
		    $.kioscos.fireEvent('open');
		    break;
	}	
    
};
