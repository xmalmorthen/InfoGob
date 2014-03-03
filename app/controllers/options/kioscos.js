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

var geolocalization;

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
			} else {
				ModulosKioscos.lista();
			}
		}
		
		Titanium.UI.createAlertDialog({title:'Kioscos de Gobierno', message:msg}).show();
		//Ti.API.info("Code translation: "+translateErrorCode(e.code));
		return;
	}

	ModulosKioscos.geolocalization.longitude = e.coords.longitude;
	ModulosKioscos.geolocalization.latitude = e.coords.latitude;
	ModulosKioscos.geolocalization.altitude = e.coords.altitude;
	ModulosKioscos.geolocalization.heading = e.coords.heading;
	ModulosKioscos.geolocalization.accuracy = e.coords.accuracy;
	ModulosKioscos.geolocalization.speed = e.coords.speed;
	ModulosKioscos.geolocalization.timestamp = e.coords.timestamp;
	ModulosKioscos.geolocalization.altitudeAccuracy = e.coords.altitudeAccuracy;

	//Titanium.UI.createAlertDialog({title:'Lista',message: + latitude + ' - ' + longitude}).show();	
	//Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
	ModulosKioscos.refreshgeomap();	
};

Ti.Geolocation.preferredProvider = "gps";

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

$.kioscos.addEventListener('open', function() {
	$.kioscos.openedflag = 1;
	if (!locationAdded) {		
		Titanium.Geolocation.addEventListener('location',locationCallback);
		locationAdded = true;
	}
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
		case 2:
		    alert('Ayuda');
		    break;
		case 1:
		    alert('Cancelar');
		    break;		    
		case 0:
			//open up the settings page
	        var settingsIntent = Titanium.Android.createIntent({
	            action : 'android.settings.LOCATION_SOURCE_SETTINGS'
	        });
	       	
	        var curActivity = Ti.Android.currentActivity;
	        curActivity.startActivityForResult(settingsIntent, function(e){
	        	GPGGoActivate = true;
	        	locationAdded = false;
		    	$.kioscos.fireEvent('open');		        	
	        });
		    break;
	}	
    
};

var ModulosKioscos = {
	geolocalization : {
		longitude : '',
		latitude : '',
		altitude : '',
		heading : '',
		accuracy : '',
		speed : '',
		timestamp : '',
		altitudeAccuracy : ''
	},
	lista: function(){
		var descripcion = "GPS no accesible, se mostrará una lista de módulos de Kioscos...";
		Titanium.UI.createAlertDialog({title:'Lista',message:descripcion}).show();				
	},
	refreshgeomap: function(){
		
	}	
};