var locationAdded = false;
var GPGGoActivate = false; 

$.kioscos.openedflag = 0 ;
$.kioscos.focusedflag = 0;

Ti.Geolocation.preferredProvider = "gps";

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

var open = function(e){
	$.kioscos.openedflag = 1;
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (!e.success || e.error)
		{
			Ti.API.info("getCurrentPosition => error code: " + e.code + " | Code error: " + e.error);
			ModulosKioscos.show_lista();
			return;
		}		
	});		
};
$.kioscos.addEventListener('open', open);

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
		Ti.API.info("locationCallback => error code: " + e.code + " | Code error: " + e.error);							
		if (e.code == 0) {
			if (!GPGGoActivate) {
				$.kioscos.fireEvent('blur');
				$.GPSDialog.show();
			} else {
				ModulosKioscos.show_lista();				
			}			
		} else {
			ModulosKioscos.show_lista();
		}			
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

	ModulosKioscos.refreshgeomap();		
};
Titanium.Geolocation.addEventListener('location', locationCallback);
locationAdded = true;

var focus = function(e){
	$.kioscos.focusedflag = 1;
	if (!locationAdded && locationCallback) {
		Ti.API.info("adding location callback on resume [FOCUS]");
		Titanium.Geolocation.addEventListener('location', locationCallback);
		locationAdded = true;
	}
};
$.kioscos.addEventListener('focus', focus);

var blur = function(e){
	if (locationAdded) {
		Ti.API.info("adding location callback on resume [BLUR]");
		Titanium.Geolocation.removeEventListener('location', locationCallback);
		locationAdded = false;
	}
};
$.kioscos.addEventListener('blur', blur);


function GPSDialogOptionClick(e){
	switch (e.index) {
		case 1:
			ModulosKioscos.show_lista();
		    break;		    
		case 0:
			GPGGoActivate = true;
			//open up the settings page
	        var settingsIntent = Titanium.Android.createIntent({
	            action : 'android.settings.LOCATION_SOURCE_SETTINGS'
	        });	       		       	
	        var curActivity = Ti.Android.currentActivity;
	        curActivity.startActivity(settingsIntent);        
		    break;
	}	
    
};

var list = false;
var ModulosKioscos = {
	IsGPSActivated : false,
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
	show_lista: function(){
		ModulosKioscos.IsGPSActivated = false;
		$.map.visible = false;
		if (!list) {
			var descripcion = "GPS no accesible, se mostrará una lista de módulos de Kioscos...";
			Titanium.UI.createAlertDialog({title:'Lista',message:descripcion}).show();
			list = true;
			
			
			//**********************************************************************			
			var kioscos = Alloy.Collections.kioscos;
			kioscos.fetch();
			//**********************************************************************
			
			$.listakioscos.visible = true;
		}				
	},
	refreshgeomap: function(){
		ModulosKioscos.IsGPSActivated = true;
		Ti.API.info("longitude: " + ModulosKioscos.geolocalization.latitude + " | latitude: " + ModulosKioscos.geolocalization.longitude);
		
		var region = {
	        latitude: ModulosKioscos.geolocalization.latitude,
	        longitude: ModulosKioscos.geolocalization.longitude,
	        latitudeDelta: 0.01,
	        longitudeDelta: 0.01
	    };
	    /*var anno = Ti.Map.createAnnotation({
	        animate: true,
	        latitude: region.latitude,
	        longitude: region.longitude,
	        pincolor: Ti.Map.ANNOTATION_RED,
	        subtitle: 'Usted se encuentra aquí',
	        title: "Posición actual",
	    });*/
	 
	    var mapview =  $.map;
	    mapview.region = region;
	    //mapview.addAnnotation(anno);
		mapview.visible = true;
	}	
};