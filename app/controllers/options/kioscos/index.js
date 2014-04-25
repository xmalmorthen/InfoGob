Ti.include("/etc/internet.js");
Ti.include("/etc/gps.js");
//Ti.include("/etc/LatLon.js");


var search = Titanium.UI.createSearchBar({
	barColor		: Alloy.Globals.Theme.searchbarcolor,
	showCancel		: true,
	width			: '70%',
	bottom			: 10,
	hintText		: 'Buscar'
});

search.addEventListener('change', function(e){
	e.value; // search string as user types
});
search.addEventListener('return', function(e){
	search.blur();
});
search.addEventListener('cancel', function(e){
	search.blur();
});

//$.lista_kioscos.search = search;
$.lista_kioscos.searchHidden = true;


var
	openedflag 		= 0, //bandera utilizada para saber si la ventana se encuentra abierta;
	focusedflag		= 0, //bandera utilizada para saber si la ventana tiene el foco establecido
	ventanaactiva 	= 1, //bandera que indica la ventana activa 1=mapa 2=lista
	locationAdded 	= false; //bandera utilizada para saber si el handle de localizacion ha sido establecido

$.toastINTERNET.visible = !verificasihayinternet();

Titanium.Network.addEventListener('change', function(e)
{
	$.toastINTERNET.visible = !e.online; //Icono de estatus de internet
});

//Funcion para verificar el estado del GPS
var VerificaGPS = function(){
	if (ventanaactiva == 1) //Si la ventana activa es la de mapa, verificamos el estado del GPS
	{	
		$.toastGPS.visible 			= GPS.active === false  ? true : false; //activar el icono de no gps activo		
		$.centrarposicion.visible 	= GPS.active === true ? true : false; //ocultar el icono de centrar posicion gps
		$.toastGPS.code 			= GPS.active === false ? GPS.error.error : null;
		$.vista_mapa.userLocation 	= GPS.active === true ? true : false;
		
		
		if (GPS.provider != 'gps') {
			$.toastGPS.image="/images/own/128x128/no_gps.png";
			$.toastGPS.message= "GPS desactivado o no se encuentra señal GPS válida...";
			$.toastGPS.configure='true';				
		} else {
			$.toastGPS.image="/images/own/128x128/err_gps.png";
			$.toastGPS.message= "No se encuentra señal GPS ";
			$.toastGPS.configure='false';
		}
		
		MuestraKioscosMapa();
		
	} else {
		if ($.centrarposicion.visible === true) {
			$.centrarposicion.visible = false; //Si la ventana activa no es la de mapa, ocultamos el boton de centrado de GPS
		}		
	}
};

function cambia_vista(opc){
	
	if (ventanaactiva == opc) return; 
	
	$.activityIndicator.show();	
	switch (opc){
		case 1:
			$.mapConfigs.visible = true;
			$.vista_lista.zIndex = 1;
			$.vista_mapa.zIndex = 2;
			ventanaactiva = 1;
		break;
		case 2:
			$.mapConfigs.visible = false;
			$.vista_mapa.zIndex = 1;
			$.vista_lista.zIndex = 2;
			ventanaactiva = 2;
			MuestraListaKioscos(); //Muestra lista de kioscos
		break;		
	}
	VerificaGPS();
};

//boton mapa - click
var open_view_mapa = function(e){
	cambia_vista(1);
};

//boton lista - click
var open_view_lista = function(e){
	cambia_vista(2);
};

var 
obtengpsyverificaestatus = function(){
	if (ventanaactiva == 1) {		
		ObtenerPosicionGPS(VerificaGPS);		
	}
},
open = function(e){
	openedflag = 1;
	obtengpsyverificaestatus();
},
focus = function(e){
	focusedflag = 1;
	if (!locationAdded && locationCallback) {
		Titanium.Geolocation.addEventListener('location', locationCallback);
		locationAdded = true;
	}
		
	obtengpsyverificaestatus();	
},
blur = function(e){
	if (locationAdded) {
		Titanium.Geolocation.removeEventListener('location', locationCallback);
		locationAdded = false;
	}
},
close = function(){
	clearInterval(timer);
	timer = null;
	ventanaactiva = 0;
	db.close();
},
locationCallback = function(e){
	if(openedflag == 0 ){
		$.index.fireEvent('open');
	}
	if(focusedflag == 0){
		$.index.fireEvent('focus');
	}
		
	GPS.active 			= false;	
	GPS.provider 		= 'gps';
	GPS.error.success 	= e.success;
	GPS.error.codigo 	= e.code;
	GPS.error.error 	= e.error;
	GPS.error.mensaje 	= traducircodigodeerror(e.code);
	
	if ( e.success && e.error == null && e.provider.name == 'gps' )
	{	
		GPS.geolocalization.longitude = e.coords.longitude;
		GPS.geolocalization.latitude = e.coords.latitude;
		GPS.geolocalization.altitude = e.coords.altitude;
		GPS.geolocalization.heading = e.coords.heading;
		GPS.geolocalization.accuracy = e.coords.accuracy;
		GPS.geolocalization.speed = e.coords.speed;
		GPS.geolocalization.timestamp = e.coords.timestamp;
		GPS.geolocalization.altitudeAccuracy = e.coords.altitudeAccuracy;
		
		GPS.active = true;				
	} else {
		GPS.active = false;					
	}
		
	VerificaGPS();
	
	Ti.API.info("locationCallback : GPS ACTIVE: " + GPS.active + " - SUCCESS: " + GPS.error.success + " - CODIGO: " + GPS.error.codigo + " - ERROR: " + GPS.error.error + " - MENSAJE: " + GPS.error.mensaje);
};

Titanium.Geolocation.addEventListener('location', locationCallback);
locationAdded = true;
$.index.addEventListener('open', open);
$.index.addEventListener('focus', focus);
$.index.addEventListener('blur', blur);
$.index.addEventListener('close',close);

var 
	db = null,						//variable de base de datos
	query = null,
	lista_kioscos_alfabeto = [],	//lista de kioscos por orden alfabético
	lista_kioscos_distancia = [];	//lista de kioscos por orden de distancia

var ObtenKioscosBDLocal = function(){
	db = Ti.Database.install(Alloy.Globals.databasepath + Alloy.Globals.databases.kioscos, 'kioscos');
	return db.execute('SELECT id,descripcion,domicilio,lat,lng FROM tbl_kioscos  order by descripcion');
},
/*
 * tipo_retorno : 	1 = ordenado por alfabeto
 * 					2 = ordenado por distancia
 */
ObtenerKioscosFormateado = function (tipo_retorno){
	if (typeof tipo_retorno == 'undefined' ||  GPS.active === false) tipo_retorno = 1;
		
	switch (tipo_retorno) {
	    case 1:  // ordenado por alfabeto
	    	if (lista_kioscos_alfabeto.length <= 0)
	    	{
	    		query = ObtenKioscosBDLocal();
	    		var lista = [];
	    		while (query.isValidRow())
				{
					kiosco = {
				        title							: query.fieldByName('descripcion'),
					    id_kiosco						: query.fieldByName('id'),
					    descripcion						: query.fieldByName('descripcion'),
					    domicilio						: query.fieldByName('domicilio'),
					    lat								: query.fieldByName('lat'),
					    lng								: query.fieldByName('lng')
				    };		
					lista_kioscos_alfabeto.push(kiosco);
					query.next();
				}
	    	};
	    	return lista_kioscos_alfabeto; 
	    break;
	    case 2:  // ordenado por distancia
	    	if (lista_kioscos_distancia.length <= 0) {
	    		query = ObtenKioscosBDLocal();
    			
    			var lista = [];
	    		while (query.isValidRow())
				{
					var distance = countDistanceByMiles(GPS.geolocalization.latitude,
													    GPS.geolocalization.longitude,
													    query.fieldByName('lat'),
													    query.fieldByName('lng')
							 						   );
										
					kiosco = {
				        title							: query.fieldByName('descripcion'),
					    id_kiosco						: query.fieldByName('id'),
					    descripcion						: query.fieldByName('descripcion'),
					    domicilio						: query.fieldByName('domicilio'),
					    lat								: query.fieldByName('lat'),
					    lng								: query.fieldByName('lng'),
					    distance						: distance
				    };		
					lista_kioscos_distancia.push(kiosco);
					query.next();
				}
	    	}; 
	    	return lista_kioscos_distancia; 	    	   
	    break;
	    default:
	      return lista_kioscos_alfabeto;
	};
};


var 
tipomapamostrado = null, // 1 = sin distancia, 2 = con distancia
InicializaMapa = function(){
	if (GPS.active === true) {
		/*var region = {
	        latitude:  GPS.geolocalization.latitude,
	        longitude: GPS.geolocalization.longitude,
	        latitudeDelta: 0.025,
	        longitudeDelta: 0.025
	   	};
		$.vista_mapa.region = region;*/
	};
},
MuestraKioscosMapa = function(){ //funcion que georeferencia los kioscos en el mapa	
	//InicializaMapa();
	var tipomapaamostrar = GPS.active === true ? 1 : 0; 
	
	if (tipomapamostrado == tipomapaamostrar) {
		$.activityIndicator.hide();
		return;
	} 
	
	tipomapamostrado = tipomapaamostrar;
	
	var listakioscos = ObtenerKioscosFormateado(); //Obtener lista de Kioscos
	for (var i=0; i < listakioscos.length; i++) {
		var 
			lat = listakioscos[i].lat,
			lon = listakioscos[i].lng;				
				
		var annotView = Titanium.UI.createView({
		    width 						: Titanium.UI.SIZE,
			height 						: Titanium.UI.SIZE,
			layout						: 'vertical'
		});
		
		var lblTitle = Titanium.UI.createLabel({
			text 						: listakioscos[i].descripcion,
			width 						: Titanium.UI.SIZE,
			height 						: Titanium.UI.SIZE,
			left						: 1,
			color						: 'white',
		    font:{
		    	fontFamily				: Alloy.Globals.Fuente.fontFamily, 
		    	fontSize				: Alloy.Globals.Fuente.tamanioFuenteSubTitulo, 
		    	fontWeight				: 'bold'
			}
		});
		
		var lblSubTitle = Titanium.UI.createLabel({
			text 						: listakioscos[i].domicilio,
			width 						: Titanium.UI.SIZE,
			height 						: Titanium.UI.SIZE,
			left						: 1,
			color						: '#cacaca',
		    font:{
		    	fontFamily				: Alloy.Globals.Fuente.fontFamily, 
		    	fontSize				: Alloy.Globals.Fuente.tamanioFuenteTexto,
		    	fontWeight				: 'bold'
			}
		});
		annotView.add(lblTitle);
		annotView.add(lblSubTitle);
		
		if (GPS.active === true && (typeof(listakioscos[i].distance) == 'undefined') ) {				
			var distance = countDistanceByMiles(GPS.geolocalization.latitude,
										    	GPS.geolocalization.longitude,
										    	lat,
										    	lon
				 						   	   );
	   		listakioscos[i].distance = distance;
		
			var distanceVW = Titanium.UI.createView({
			    width 						: Titanium.UI.SIZE,
				height 						: Titanium.UI.SIZE,
				right						: 1,
				layout						: 'horizontal'
			});
			
			var lbldistance = Titanium.UI.createLabel({
				text 						: listakioscos[i].distance,
				width 						: Titanium.UI.SIZE,
				height 						: Titanium.UI.SIZE,
				left						: 1,
				color						: 'white',
			    font:{
			    	fontFamily				: Alloy.Globals.Fuente.fontFamily, 
			    	fontSize				: Alloy.Globals.Fuente.tamanioFuenteSubTitulo, 
			    	fontWeight				: 'bold'
				}
			});
			
			var lbltxt = Titanium.UI.createLabel({
				text 						: ' Km aprox.',
				width 						: Titanium.UI.SIZE,
				height 						: Titanium.UI.SIZE,
				color						: '#cacaca',
				left						: 1,
				bottom						: 2,
			    font:{
			    	fontFamily				: Alloy.Globals.Fuente.fontFamily, 
			    	fontSize				: Alloy.Globals.Fuente.tamanioFuenteTexto
				}
			});
			
			distanceVW.add(lbldistance);
			distanceVW.add(lbltxt);
			
			annotView.add(distanceVW);
		}
		
		var anno = Ti.Map.createAnnotation({
	        animate				: true,
	        image				: "/images/own/48x48/map_marker.png",
	        pincolor			: Ti.Map.ANNOTATION_RED,
	        latitude			: lat,
	        longitude			: lon,		        
	        //subtitle			: listakioscos[i].domicilio,
	        //title				: listakioscos[i].descripcion + ' | Distancia aproximada: ' + listakioscos[i].distance + ' km',
	        id 					: listakioscos[i].id_kiosco,
	        rightView 			: annotView		        
	    });
		$.vista_mapa.addAnnotation(anno);			
	};
    $.activityIndicator.hide();
},
MuestraListaKioscos = function(){ //funcion que muestra la lista de kioscos
	var 
		Data = [],
		listakioscos = ObtenerKioscosFormateado(2); //Obtener lista de Kioscos

	var veces = 0;	
	for (var i=0; i < listakioscos.length; i++) {
		
		//Fila del tableview
		var row = Ti.UI.createTableViewRow({
			layout							:'vertical',
		    selectedBackgroundColor			: "#cccccc",
		    height							: Ti.UI.SIZE,
		    width							: Ti.UI.SIZE,
		    top								: 1,
		    bottom							: 1,
		    rightImage						: '/images/own/32x32/align_just.png',	
		    title							: listakioscos[i].descripcion,
		    id_kiosco						: listakioscos[i].id_kiosco,
		    descripcion						: listakioscos[i].descripcion,
		    domicilio						: listakioscos[i].domicilio,
		    lat								: listakioscos[i].lat,
		    lng								: listakioscos[i].lng
	  	});	
	  	
	  	
	  	var vw = Ti.UI.createView({
	  		height							: Ti.UI.SIZE,
	  		width							: '99%',
	  		layout							: 'horizontal'
	  	});
	  	
	  	//Etiqueta de título
		var Title = Ti.UI.createLabel({
		    color							: Alloy.Globals.Fuente.colorTexto,
		    font:{
		    	fontFamily					: Alloy.Globals.Fuente.fontFamily,
        		fontSize					: Alloy.Globals.Fuente.tamanioFuenteTitulo,
        		fontWeight					: 'bold'				
	    	},
	    	left							: 2, 
		    top								: 1,
		    width							: '70%',
		    height							: Ti.UI.SIZE,
		    text							: listakioscos[i].descripcion
		});
	  	vw.add(Title);
	  	
	  	if (GPS.active === true) {
	  		if ( typeof(listakioscos[i].distance) == 'undefined') {				
				var distance = countDistanceByMiles(GPS.geolocalization.latitude,
											    	GPS.geolocalization.longitude,
											    	lat,
											    	lon
					 						   	   );
		   		listakioscos[i].distance = distance;
	   		}
		
		  	//Etiqueta de distancia
			var Dist = Ti.UI.createLabel({
			    color							: Alloy.Globals.Fuente.colorTitulo,
			    font:{
			    	fontFamily					: Alloy.Globals.Fuente.fontFamily,
	        		fontSize					: Alloy.Globals.Fuente.tamanioFuenteTitulo,
	        		fontWeight					: 'bold'				
		    	},
		    	left							: 10, 
			    top								: 1,
			    width							: Ti.UI.SIZE,
			    height							: Ti.UI.SIZE,
			    text							: listakioscos[i].distance + ' Km aprox.'
			});
		  	vw.add(Dist);
	  	};
	  	
	  	row.add(vw);
	  	
	  	//Etiqueta de subtítulo
	  	var SubTitle = Ti.UI.createLabel({
		    color							: Alloy.Globals.Fuente.colorSubtitulo,
		    font:{
				fontFamily					: Alloy.Globals.Fuente.fontFamily,
        		fontSize					: Alloy.Globals.Fuente.tamanioFuenteSubTitulo,
        		fontWeight					: 'normal'
		 	},
		 	left							: 5, 
		 	bottom							: 10,
		    width							: Ti.UI.SIZE,
		    height							: Ti.UI.SIZE,
		    text							: listakioscos[i].domicilio			    
	  	});
	  	row.add(SubTitle);
	  	
		Data.push(row);
	}	
	$.lista_kioscos.data = Data;
	
	$.activityIndicator.hide();
};

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
			ConfigurarGPS();
    	}    	
  	});
  	dialog.show();
};

var 
centrarposicion = function(){
	InicializaMapa();	
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

//onclick - TableView
var 
click_opc = function (e){
	$.activityIndicator.show();
	var 
		id = e.rowData.id_kiosco;
		muestralistatramites(id);
},
muestralistatramites = function(id){
	GeneraListaTramites(id);		
	$.vistatramites.zIndex = 10;
	$.vistatramites.visible = true;
};

var timer = setInterval( function() {
	obtengpsyverificaestatus();
	if (ventanaactiva != 0) { Ti.API.info('timer ejecutado'); }
}, 5000 );


var click_map = function(evt){	
	if (evt.clicksource != 'pin') {
		$.activityIndicator.show();
		var	id_kiosco = evt.annotation.id;
	  	muestralistatramites(id_kiosco);
  	}
},
ObtenTramitesenKioscosBDLocal = function(id_kiosco){
	return db.execute('SELECT id,id_ficha_retys,descripcion FROM tbl_kioscos_tramites where id_kiosco = ' + id_kiosco);	
},
GeneraListaTramites = function(id_kiosco){
	var 
		Data = [],	
		listatramiteskioscos = ObtenTramitesenKioscosBDLocal(id_kiosco); //Obtener lista de tramites
	
	var veces = 0;
	while (listatramiteskioscos.isValidRow())
	{	
		//Fila del tableview
		var row = Ti.UI.createTableViewRow({
			layout							: 'vertical',
			selectedBackgroundColor			: "#cccccc",
		    top								: 1,
		    bottom							: 1,
		    rightImage 						: '/images/own/16x16/image_text.png',
		    //height						: Ti.UI.SIZE,
		    //width							: Ti.UI.SIZE,
		    title							: listatramiteskioscos.fieldByName('descripcion'),		    
		    id_tramite						: listatramiteskioscos.fieldByName('id'),
		    id_ficha_retys					: listatramiteskioscos.fieldByName('id_ficha_retys'),
		    descripcion						: listatramiteskioscos.fieldByName('descripcion')
	  	});
	  	  		  	
	  	//Etiqueta de título
		var Title = Ti.UI.createLabel({
		    color							: Alloy.Globals.Fuente.colorTexto,
		    font: {
		        fontFamily					: Alloy.Globals.Fuente.fontFamily,
		        fontSize					: Alloy.Globals.Fuente.tamanioFuenteLista,
		        fontWeight					: 'bold'
		    },		    
	    	left							: 2, 
		    top								: 5,
		    bottom							: 5,
		    width							: '80%',
		    height							: Ti.UI.SIZE,
		    text							: listatramiteskioscos.fieldByName('descripcion')
		});
	  	row.add(Title);
	  								
		Data.push(row); 
		
		veces++;		
	  	
	  	listatramiteskioscos.next();
	}
	$.lista_tramiteskioscos.data = Data;
	
	$.activityIndicator.hide();
},
click_tramitekiosco = function(e){
	if (verificasihayinternet()) {
		var id = e.rowData.id_ficha_retys;
		$.activityIndicator.show();		
		DespliegaFichaRETyS(id);
	} else {
		Ti.UI.createAlertDialog({
		    cancel: 0,
		    buttonNames: ['Aceptar'],
		    message: 'Para mostrar la ficha RETyS del trámite es necesario tener servicio de Internet activo...',
		    title: 'Conexión a Internet'
		}).show();
	}
};

$.index.addEventListener('android:back', function(e) {
	if ($.vistaficharetys.visible === true) {
		Closesubviewficha();
	} else if ($.vistatramites.visible === true) {
		Closesubviewtramites();
	} else {
		$.index.close();
	};	 
});

var 
Closesubviewtramites = function(){
	$.vistatramites.visible = false;
},
Closesubviewficha = function(){
	$.vistaficharetys.visible = false;
};

var DespliegaFichaRETyS = function(id_ficha_retys){
	ConsultaFichaRETyS(id_ficha_retys, function (data) {
		//Crea bloque de titulo
		function CrearLabelTitulo(label){
			var TitleLabel = Ti.UI.createLabel({
				color					: Alloy.Globals.Fuente.colorSubtitulo,
				font: {
			        fontFamily			: Alloy.Globals.Fuente.fontFamily,
			        fontSize			: Alloy.Globals.Fuente.tamanioFuenteSubTitulo + 7,
			        fontWeight			: 'bold'
			    },
			    width					: "40%",
				height					: Ti.UI.SIZE,
				left					: 1,
			    text					: label
			});
			return TitleLabel;			
		};
		
		//Crea bloque de datos
		function CrearLabelData(obj){
			var rowdata  = Ti.UI.createView({
				width					: Ti.UI.SIZE,
				height					: Ti.UI.SIZE,
				layout					: 'vertical'
			}),
			dato = false;
				
			if (typeof obj === 'object') {
			
				for(var item in obj) {
					if (obj.length > 0){
						var DataLabel = Ti.UI.createLabel({
							color					: Alloy.Globals.Fuente.colorTexto,
							font: {
						        fontFamily			: Alloy.Globals.Fuente.fontFamily,
						        fontSize			: Alloy.Globals.Fuente.tamanioFuenteLista,
						        fontWeight			: 'bold'		        
						    },
						    left					: 5,
							width					: "55%",
							height					: Ti.UI.SIZE,
						    text					: obj[item]
						});
						rowdata.add(DataLabel);
						dato = true;
					}
				}
			} else {
				if (obj.length > 0){
					var DataLabel = Ti.UI.createLabel({
						color					: Alloy.Globals.Fuente.colorTexto,
						font: {
					        fontFamily			: Alloy.Globals.Fuente.fontFamily,
					        fontSize			: Alloy.Globals.Fuente.tamanioFuenteLista,
					        fontWeight			: 'bold'		        
					    },
					    left					: 5,
						width					: "55%",
						height					: Ti.UI.SIZE,
					    text					: obj
					});
					rowdata.add(DataLabel);
					dato = true;
				}
			}
			
			if (!dato){
				var DataLabel = Ti.UI.createLabel({
					color						: Alloy.Globals.Fuente.colorTexto,
					font: {
				        fontFamily				: Alloy.Globals.Fuente.fontFamily,
				        fontSize				: Alloy.Globals.Fuente.tamanioFuenteLista,		        
				    },
				    left						: 5,
					width						: "55%",
					height						: Ti.UI.SIZE,
				    text						: '---'
				});
				rowdata.add(DataLabel);
			}
			
			return rowdata;			
		}
		
		//Crea bloque con titulo y datos
		function CreaBloque(titulo,data){
			//vista principal
			var vista  = Ti.UI.createView({
			    layout							: "horizontal",
				width							: Ti.UI.SIZE,
				height							: Ti.UI.SIZE,			
			});	
			
			vista.add( CrearLabelTitulo(titulo));		
			vista.add( CrearLabelData  (data));
			
			return vista;
		}
		
		//Quitar la información anterior de la vista
		for (var d = $.scrllvw.children.length-1; d >= 0; d--) {
		    $.scrllvw.remove($.scrllvw.children[d]);
		}
				
		//vista principal
		var data_ficha_retys = Ti.UI.createView({		    
		    layout								: "vertical",
			left								: 5,
			right								: 5,
			top									: 5,
			bottom								: 5,
			width								: Ti.UI.SIZE,
			height								: Ti.UI.SIZE
		});
		
		/*var data = {
			nombre 					: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			descripcion 			: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			tipo					: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',	
			fecha_validacion		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			a_quien_va_dirigido		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			requisitos				: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			documentos				: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			observaciones			: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			costos					: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			costos_nota				: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			forma_pago				: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			pasos					: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			tiempo_respuesta		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			formatos_autorizados	: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			medios_impugnacion		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			Afirmativa_Ficta		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			responsable : {
					ubicacion		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					dependencia		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					responsable		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					correo			: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					telefonos		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					extension		: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					horario_oficina	: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			},
			normatividad 			: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		};*/
					
		data_ficha_retys.add( CreaBloque('Nombre',data.nombre) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Descripción',data.descripcion) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Tipo',data.tipo) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Fecha de validación',data.fecha_validacion) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('¿A quién va dirigido?',data.a_quien_va_dirigido) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Requisitos',data.requisitos) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
						
		data_ficha_retys.add( CreaBloque('Documentos',data.documentos) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));

		data_ficha_retys.add( CreaBloque('Observaciones',data.observaciones) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));		
		
		data_ficha_retys.add( CreaBloque('Costos',data.costos) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Nota de Costos',data.costos_nota) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Formas de pago',data.forma_pago) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Pasos a seguir para realizar el trámite',data.pasos) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Tiempo de respuesta',data.tiempo_respuesta) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Formatos autorizados',data.formatos_autorizados) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Medios de impugnación',data.medios_impugnacion) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		data_ficha_retys.add( CreaBloque('Afirmativa Ficta',data.Afirmativa_Ficta) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
		
		var rowdata  = Ti.UI.createView({
		    layout						: "vertical",
			width						: Ti.UI.SIZE,
			height						: Ti.UI.SIZE
		});		
		rowdata.add( CrearLabelData( "Ubicación: " + data.responsable.ubicacion ) );
		rowdata.add( CrearLabelData( "Dependencia: " + data.responsable.dependencia ) );
		rowdata.add( CrearLabelData( "Responsable: " + data.responsable.responsable ) );
		rowdata.add( CrearLabelData( "Correo: " + data.responsable.correo ) );
		rowdata.add( CrearLabelData( "Teléfonos: " + data.responsable.telefonos ) );
		rowdata.add( CrearLabelData( "Extension: " + data.responsable.extension ) );
		rowdata.add( CrearLabelData( "Horario de oficina: " + data.responsable.horario_oficina ) );
		var vista  = Ti.UI.createView({
		    layout:"horizontal",
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE,			
		});
		vista.add( CrearLabelTitulo('Responsable'));		
		vista.add( rowdata);
		data_ficha_retys.add(vista);
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor: Alloy.Globals.Theme.dividerColor}));
				
		data_ficha_retys.add( CreaBloque('Normatividad',data.normatividad) );
		
		$.scrllvw.add(data_ficha_retys);
		$.scrllvw.scrollTo(0,0);
						
		$.vistaficharetys.zIndex = 11;
		$.vistaficharetys.visible = true;
		
		$.activityIndicator.hide();	
	});
};

var ConsultaFichaRETyS = function(id_ficha_retys,callback){
	var
	nodata = Ti.UI.createAlertDialog({
				    cancel: 0,
				    buttonNames: ['Aceptar'],
				    message: 'No se encontró información en RETyS para éste trámite...',
				    title: 'Ficha RETyS'
			 }),
	errorresponse = Ti.UI.createAlertDialog({
				    cancel: 0,
				    buttonNames: ['Aceptar'],
				    message: 'Ocurrió un problema al intentar obtener la ficha RETyS, favor de intentarlo más tarde...',
				    title: 'Ficha RETyS'
			 }),			 
	sendit = Ti.Network.createHTTPClient({
	 	timeout : Alloy.Globals.cnfg.wstimeout,
	 	onerror : function(e) {	
	  		Ti.API.debug(e.error);
	  		errorresponse.show();
	  		$.activityIndicator.hide();		  		
	 	},
	 	onload : function() {
	 		var json = null;
	 		try {
	 			var responsemime = this.responseData.mimeType;	 			
	 			if (responsemime != 'text/html') {	 			
					json = JSON.parse(this.responseText);
				} else {
					errorresponse.show();
					$.activityIndicator.hide();
					return;					
				}
			}
			catch (e) {
				Ti.API.debug(e.message);
		  		errorresponse.show();
		  		$.activityIndicator.hide();
			}
						
			if (json.length == 0) {
				nodata.show();
		 	} else {
		 		if (json.exito == 1) {
		 			if (typeof callback != 'undefined') callback (json);
	 			} else {
	 				nodata.show();
	 			}
	 		}
			$.activityIndicator.hide();			
		}
	});	
	
	if (id_ficha_retys) {
		var
			format = "json",
			url = "http://10.10.20.132/REST_retys/index.php/servicio/consulta_tramite/format/" + format + "/" + id_ficha_retys;
		
		sendit.open('GET',url);
		sendit.cache = false;
		sendit.setRequestHeader('Content-Type', 'application/json; charset=utf-8');			
		sendit.send();		
	} else {
		nodata.show();
		$.activityIndicator.hide();
	}	
	
};

var changeMapType = function(e){
	//alert(e.rowIndex);
	
	var mapType = Ti.Map.STANDARD_TYPE;	
	switch (e.rowIndex){
		case 0:
			mapType = Titanium.Map.STANDARD_TYPE;	
		break;
		case 1:
			mapType = Titanium.Map.SATELLITE_TYPE;
		break;		
		case 2:
			mapType = Titanium.Map.HYBRID_TYPE;
		break;
	};
	$.vista_mapa.mapType = mapType;	
};

cambia_vista(1);

$.index.open();

