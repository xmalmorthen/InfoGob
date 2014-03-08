$.index.Internet = 0; //bandera utilizada para saber si el dispositivo tiene internet activo
$.index.openedflag = 0; //bandera utilizada para saber si la ventana se encuentra abierta;
$.index.focusedflag = 0; //bandera utilizada para saber si la ventana tiene el foco establecido
$.index.focusedViewMap = 1; //bandera utilizada para saber si la ventana tiene el foco establecido

var InternetTimeOut = setInterval(function(){
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		$.index.Internet = 0;
		$.btn_mapa.enabled = false;
		$.btn_mapa.opacity = .5;
		$.btn_mapa.removeEventListener ('click',open_view_mapa);
		if ($.index.focusedViewMap){
			$.INTERNETDialog.show();
			cambia_vista(2);
		}
	} else {
		$.index.Internet = 1;
		$.btn_mapa.enabled = true;
		$.btn_mapa.opacity = 1;
		$.btn_mapa.addEventListener ('click',open_view_mapa);				
	}
}, 1000);

$.index.addEventListener('close',function(){
	clearInterval( InternetTimeOut );
});

function INERNETDialogOptionClick(e){
	switch (e.index) {
		case 0:
	    break;
	}    
};

var locationAdded = false, //bandera utilizada para saber si el handle de localizacion ha sido establecido
	GPGGoActivate = false; //bandera utilizada para saber si se lanzo el avtivity de activación de GPS 


Ti.Geolocation.preferredProvider = "gps";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

//boton mapa - click
var open_view_mapa = function(e){
	cambia_vista(1);
};

//boton lista - click
var open_view_lista = function(e){
	cambia_vista(2);
};

//Funciones click de vistas
//********************************************************************************
	function cambia_vista(opc){
		switch (opc){
			case 1:
				if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {	   
	   				//$.INTERNETDialog.show();
				} else {
	   				$.vista_lista.zIndex = 1;
					$.vista_mapa.zIndex = 2;
					$.index.focusedViewMap = 1;					
				}				
			break;
			case 2:
				$.vista_mapa.zIndex = 1;
				$.vista_lista.zIndex = 2;
				$.index.focusedViewMap = 0;
			break;		
		}
	};
//********************************************************************************

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

var open = function(e){
	$.index.openedflag = 1;
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (!e.success || e.error)
		{
			if ($.index.Internet){
				Ti.API.info("getCurrentPosition => error code: " + e.code + " | Code error: " + e.error);
				ModulosKioscos.show_lista();
			}
			return;
		}		
	});		
};

var locationCallback = function(e){
	if($.index.openedflag == 0 ){
		Ti.API.info('firing open event');
		$.index.fireEvent('open');
	}
	if($.index.focusedflag == 0){
		Ti.API.info('firing focus event');
		$.index.fireEvent('focus');
	}
	if (!e.success || e.error)
	{	
		Ti.API.info("locationCallback => error code: " + e.code + " | Code error: " + e.error);							
		if (e.code == 0) {
			if ($.index.Internet){
				if (!GPGGoActivate) {
					$.index.fireEvent('blur');
					$.GPSDialog.show();
				} else {
					ModulosKioscos.show_lista();				
				}			
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

var focus = function(e){
	$.index.focusedflag = 1;
	if (!locationAdded && locationCallback) {
		Ti.API.info("adding location callback on resume [FOCUS]");
		Titanium.Geolocation.addEventListener('location', locationCallback);
		locationAdded = true;
	}
};

var blur = function(e){
	if (locationAdded) {
		Ti.API.info("adding location callback on resume [BLUR]");
		Titanium.Geolocation.removeEventListener('location', locationCallback);
		locationAdded = false;
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
		if (!list) {
			if (!ModulosKioscos.IsGPSActivated) {
				var descripcion = "GPS no accesible, se mostrará una lista de módulos de Kioscos...";
				Titanium.UI.createAlertDialog({title:'Lista',message:descripcion}).show();
			}
			if (!$.index.Internet) {
				var descripcion = "GPS no accesible, se mostrará una lista de módulos de Kioscos...";
				Titanium.UI.createAlertDialog({title:'Lista',message:descripcion}).show();
			}
			list = true;
			//**********************************************************************			
				/*var fighters = Alloy.Collections.fighters;
				var counter = 1;				
				fighters.fetch();*/
			
			//**********************************************************************
			cambia_vista(2);
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
	 
	    var mapview =  $.vista_mapa;
	    mapview.region = region;
	    //mapview.addAnnotation(anno);
		mapview.visible = true;
	}	
};

$.index.addEventListener('open', open);
Titanium.Geolocation.addEventListener('location', locationCallback);
locationAdded = true;
$.index.addEventListener('focus', focus);
$.index.addEventListener('blur', blur);

$.index.open();