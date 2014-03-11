$.index.Internet = 0; //bandera utilizada para saber si el dispositivo tiene internet activo
$.index.GPS = 0; //bandera utilizada para saber si el dispositivo tiene internet activo
$.index.openedflag = 0; //bandera utilizada para saber si la ventana se encuentra abierta;
$.index.focusedflag = 0; //bandera utilizada para saber si la ventana tiene el foco establecido
$.index.focusedViewMap = 1; //bandera utilizada para saber si la ventana tiene el foco establecido
$.index.ventanaactiva = 1; //bandera que indica la ventana activa 1=mapa 2=lista
var locationAdded = false; //bandera utilizada para saber si el handle de localizacion ha sido establecido

//Activa o desactiva el boton de mapa
var EnableDisableBtnMap = function(estado){
	$.btn_mapa.enabled = estado;
	$.btn_mapa.opacity = estado ? 1 :.3;
	
	if (!estado){
		$.btn_mapa.removeEventListener ('click',open_view_mapa);
	} else {
		$.btn_mapa.addEventListener ('click',open_view_mapa);
	}	
};

//Verificar si hay internet
var VerificaInternet = function(){
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		$.index.Internet = 0;
		EnableDisableBtnMap(false);

		//Si se encuentra seleccionada la opcion de mapa, cambia automaticamente a la vista de lista
		if ($.index.focusedViewMap){
			//$.INTERNETDialog.show();
			cambia_vista(2);
		}
	} else {
		$.index.Internet = 1;
		EnableDisableBtnMap(true);
	}
	
	$.toastINTERNET.visible = !$.index.Internet;
};

var ToastGPS = function(){
	switch ($.index.GPS){
		//si no se encuentra el GPS activo
		case 0:
			$.toastGPS.image="/images/own/48x48/target.png";
			$.toastGPS.message="Servicio de posicionamiento no habilitado o se ha perdio la conexión al GPS...";
			$.toastGPS.configure='true';
		break;
		//si se pierde señal GPS
		case 2:
			$.toastGPS.image="/images/own/48x48/cert.png";
			$.toastGPS.message="Buscando señal GPS...";
			$.toastGPS.configure='false';
		break;
	}
	
	$.toastGPS.visible = $.index.GPS != 1 ? true : false;
	$.centrarposicion.visible = $.index.GPS == 1 ? true : false;
};


var iteradorGPS = 0; //Contador utilizado para las iteraciones en la cual deberá actualizar el posicionamiento GPS
var StatusServicesTimeOut = setInterval(function(){
	if ($.index.focusedViewMap == true){	
		VerificaInternet();
		ToastGPS();
		iteradorGPS = iteradorGPS + 1;
		if (iteradorGPS == 5) {
			ObtenerPosicionGPS();
			iteradorGPS=0;
		}
	}
}, 1000);

$.index.addEventListener('close',function(){
	clearInterval( StatusServicesTimeOut );
});

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

actualizacontroles = function(){
	$.centrarposicion.visible = $.index.focusedViewMap ? true : false; 
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
				ModulosKioscos.show_lista();
			break;		
		}
		actualizacontroles();
	};
//********************************************************************************

GPSConfigure = function (){
	//open up the settings page
    var settingsIntent = Titanium.Android.createIntent({
        action : 'android.settings.LOCATION_SOURCE_SETTINGS'
    });	       		       	
    var curActivity = Ti.Android.currentActivity;
    curActivity.startActivity(settingsIntent);	
};


var ObtenerPosicionGPS = function(){
	Titanium.Geolocation.getCurrentPosition(function(e)
	{		
		Ti.API.info("getCurrentPosition : " + e.code + " - " + e.error);
		if (e.success && !e.error)
		{		
			ModulosKioscos.geolocalization.longitude = e.coords.longitude;
			ModulosKioscos.geolocalization.latitude = e.coords.latitude;
			ModulosKioscos.geolocalization.altitude = e.coords.altitude;
			ModulosKioscos.geolocalization.heading = e.coords.heading;
			ModulosKioscos.geolocalization.accuracy = e.coords.accuracy;
			ModulosKioscos.geolocalization.speed = e.coords.speed;
			ModulosKioscos.geolocalization.timestamp = e.coords.timestamp;
			ModulosKioscos.geolocalization.altitudeAccuracy = e.coords.altitudeAccuracy;
			ModulosKioscos.refreshgeomap();
			return;
		}
		//Actualizar variable a buscando señal gps, si al menos el gps ya ha sido actualizado
		if ($.index.GPS == 1 ) {
			$.index.GPS = 2;
		}
	});	
};

var open = function(e){
	$.index.openedflag = 1;
	ObtenerPosicionGPS();	
};

var locationCallback = function(e){
	if($.index.openedflag == 0 ){
		$.index.fireEvent('open');
	}
	if($.index.focusedflag == 0){
		$.index.fireEvent('focus');
	}
	
	Ti.API.info("locationCallback : " + e.code + " - " + e.error);
	
	if (!e.success || e.error)
	{						
		if (e.code == 0) {
			$.index.GPS = 0;
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

	$.index.GPS = 1;
	
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
	getlocaldata : function(){
		var db = Ti.Database.install(Alloy.Globals.databasepath + Alloy.Globals.databases.kioscos, 'kioscos'),
			listakioscos = db.execute('SELECT id,descripcion,domicilio,lat,lng FROM tbl_kioscos'),
			Data = [];
		
		//Constructor del menu a partir del objeto de opciones
		while (listakioscos.isValidRow())
		{
			//Fila del tableview
			var row = Ti.UI.createTableViewRow({
			    backgroundSelectedColor:'#cacaca',
			    selectedColor: "#cccccc",			    
			    height:Ti.UI.SIZE,
			    layout: 'vertical',
			    title: 			listakioscos.fieldByName('descripcion'),
			    id_kiosco:		listakioscos.fieldByName('id'),
			    descripcion: 	listakioscos.fieldByName('descripcion'),
			    domicilio:		listakioscos.fieldByName('domicilio'),
			    lat:			listakioscos.fieldByName('lat'),
			    lng:			listakioscos.fieldByName('lng')
		  	});	
		  	//Etiqueta de título
			var Title = Ti.UI.createLabel({
			    color:'#576996',
			    font:{
			    	fontFamily:'Arial', 
			    	fontSize:Alloy.Globals.defaultFontSize + 21, 
			    	fontWeight:'bold'
		    	},
		    	left:2, 
			    top: 2,
			    width:Ti.UI.SIZE,
			    height: Ti.UI.SIZE,
			    text: 			listakioscos.fieldByName('descripcion')
			});
		  	row.add(Title);
		  	//Etiqueta de subtítulo
		  	var SubTitle = Ti.UI.createLabel({
			    color:'#222',
			    font:{
					fontFamily:'Arial', 
					fontSize:Alloy.Globals.defaultFontSize + 9, 
					fontWeight:'normal'
			 	},
			 	left:2, 
			    top: 2,
			    width:Ti.UI.SIZE,
			    height: Ti.UI.SIZE,
			    text:			listakioscos.fieldByName('domicilio')			    
		  	});
		  	row.add(SubTitle);
			
			Data.push(row); 
			
		  	listakioscos.next();
		}
		listakioscos.close();
		db.close();
		
		$.lista_kioscos.data = Data;
	},
	show_lista: function(){	
		ModulosKioscos.getlocaldata();
	},
	initmap : false,
	initializemap: function(){
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
	},
	refreshgeomap: function(){		
		if (ModulosKioscos.initmap == false) {
			ModulosKioscos.initializemap();
			ModulosKioscos.initmap=true;
		}
	}	
};

Titanium.Geolocation.addEventListener('location', locationCallback);
locationAdded = true;
$.index.addEventListener('open', open);
$.index.addEventListener('focus', focus);
$.index.addEventListener('blur', blur);

//Click - botones de servicios - GPS/INTERNET
var toastNotification = function (e){
	var msg = this.message,
		opc = ['Aceptar'];
		
	if (this.configure == 'true'){
		opc.push('Configurar');
	} 	
		
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 0,
	    buttonNames: opc,
	    message: msg,
	    title: 'Servicios'
  	});
	  
	dialog.addEventListener('click', function(e){
    	if (e.index !== e.source.cancel){
			GPSConfigure();
    	}    	
  	});
  	dialog.show();
};

var centrarposicion = function(){
	ModulosKioscos.initializemap();	
},
	centrarposicioninfo = function(){
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 0,
	    buttonNames: ['Aceptar'],
	    message: 'Presione para centrar su posición en el mapa',
	    title: 'Posicionamiento'
	});
	dialog.show();
};

//onclick - TableView - Menu_Principal - menue.xml
var click_opc = function (e){
	var index = e.index;	
};

$.index.open();