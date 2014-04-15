Ti.include("/etc/internet.js");
Ti.include("/etc/gps.js");

var
	openedflag = 0, //bandera utilizada para saber si la ventana se encuentra abierta;
	focusedflag = 0, //bandera utilizada para saber si la ventana tiene el foco establecido
	ventanaactiva = 1, //bandera que indica la ventana activa 1=mapa 2=lista
	locationAdded = false; //bandera utilizada para saber si el handle de localizacion ha sido establecido


$.toastINTERNET.visible = !verificasihayinternet();

Titanium.Network.addEventListener('change', function(e)
{
	$.toastINTERNET.visible = !e.online; //Icono de estatus de internet
});

//Funcion para verificar el estado del GPS
var VerificaGPS = function(){
	if (ventanaactiva == 1) //Si la ventana activa es la de mapa, verificamos el estado del GPS
	{	
		if (GPS.error.error != null || GPS.error.codigo != null) {
			
			if ($.toastGPS.code == GPS.error.error) return;
						
			var err = GPS.error.error + "...";
			switch (GPS.error.codigo){
				case null:
				case 0:
					$.toastGPS.image="/images/own/48x48/no_gps.png";
					$.toastGPS.message= "GPS desactivado o no se encuentra señal GPS válida...";
					$.toastGPS.configure='true';
				break;
				case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
					$.toastGPS.image="/images/own/48x48/gps_noaccess.png";
					$.toastGPS.message= err;
					$.toastGPS.configure='false';
				break;
				case Ti.Geolocation.ERROR_DENIED:
					$.toastGPS.image="/images/own/48x48/gps_noaccess.png";
					$.toastGPS.message= err;
					$.toastGPS.configure='false';
				break;
				case Ti.Geolocation.ERROR_NETWORK:
					$.toastGPS.image="/images/own/48x48/gps_noaccess.png";
					$.toastGPS.message= err;
					$.toastGPS.configure='false';
				break;
				case Ti.Geolocation.ERROR_HEADING_FAILURE:
					$.toastGPS.image="/images/own/48x48/gps_noaccess.png";
					$.toastGPS.message= err;
					$.toastGPS.configure='false';
				break;
				case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
					$.toastGPS.image="/images/own/48x48/gps_noaccess.png";
					$.toastGPS.message= err;
					$.toastGPS.configure='false';
				break;
				case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
					$.toastGPS.image="/images/own/48x48/gps_noaccess.png";
					$.toastGPS.message= err;
					$.toastGPS.configure='false';
				break;
				case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
					$.toastGPS.image="/images/own/48x48/gps_noaccess.png";
					$.toastGPS.message= err;
					$.toastGPS.configure='false';
				break;	
			}
			GPS.active = false;
		}	
		$.toastGPS.visible = GPS.active == false ? true : false;		
		$.centrarposicion.visible = GPS.active == true ? true : false;
		$.toastGPS.code = $.centrarposicion.visible == false ? GPS.error.error : null;
		MuestraKioscosMapa();
	} else {
		$.centrarposicion.visible = false; //Si la ventana activa no es la de mapa, ocultamos el boton de centrado de GPS		
	}
};

function cambia_vista(opc){
	if (ventanaactiva == opc) return; 
	
	$.activityIndicator.show();	
	switch (opc){
		case 1:
			$.vista_lista.zIndex = 1;
			$.vista_mapa.zIndex = 2;
			ventanaactiva = 1;
			MuestraKioscosMapa();			
		break;
		case 2:
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
		ObtenerPosicionGPS();
		VerificaGPS();
	}		
},
open = function(e){
	ObtenerPosicionGPS();
	openedflag = 1;	
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
		
	GPS.active = false;
	GPS.error.success = e.success ? e.success : null;
	GPS.error.codigo = e.code ? e.code : null;
	GPS.error.error = e.error ? e.error : null;
	GPS.error.mensaje = e.code ? traducircodigodeerror(e.code) : null;
		
	if (e.success && e.error == null)
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
		return;
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
	db = null,
	query = null;

var ObtenKioscosBDLocal = function(){
	db = Ti.Database.install(Alloy.Globals.databasepath + Alloy.Globals.databases.kioscos, 'kioscos');
	return db.execute('SELECT id,descripcion,domicilio,lat,lng FROM tbl_kioscos');
};

var 
mapaIniciado = false,
InicializaMapa = function(){
	if (GPS.active) {
		var region = {
	        latitude:  GPS.geolocalization.latitude,
	        longitude: GPS.geolocalization.longitude,
	        latitudeDelta: 0.025,
	        longitudeDelta: 0.025
	   	};
		$.vista_mapa.region = region;
		mapaIniciado = true;
	};
},
MuestraKioscosMapa = function(){ //funcion que georeferencia los kioscos en el mapa
	if (!mapaIniciado) { //Si el mapa no ha sido iniciado
		InicializaMapa();
		
		var listakioscos = ObtenKioscosBDLocal(); //Obtener lista de Kioscos
		while (listakioscos.isValidRow())
		{
			var anno = Ti.Map.createAnnotation({
		        animate: true,
		        image: "/images/own/32x32/pin_map.png",
		        pincolor: Ti.Map.ANNOTATION_RED,
		        latitude: listakioscos.fieldByName('lat'),
		        longitude: listakioscos.fieldByName('lng'),		        
		        subtitle: listakioscos.fieldByName('domicilio'),
		        title: listakioscos.fieldByName('descripcion'),
		        id : listakioscos.fieldByName('id')		        
		    });
			$.vista_mapa.addAnnotation(anno);
			
			listakioscos.next();
		};
		listakioscos.close();
	};
    $.activityIndicator.hide();
},
MuestraListaKioscos = function(){ //funcion que muestra la lista de kioscos
	var 
		listakioscos = ObtenKioscosBDLocal(), //Obtener lista de Kioscos
		Data = [];
	
	//Constructor de la lista a partir de la tabla de base de datos
	var veces = 0;
	while (listakioscos.isValidRow())
	{	
		//Fila del tableview
		var row = Ti.UI.createTableViewRow({
		    backgroundSelectedColor:'#cacaca',
		    selectedColor: "#cccccc",
		    layout:'vertical',
		    height:Ti.UI.SIZE,
		    width:Ti.UI.SIZE,
		    top: 1,
		    bottom:1,
		    rightImage: '/images/own/32x32/align_just.png',	
		    title: 			listakioscos.fieldByName('descripcion'),
		    id_kiosco:		listakioscos.fieldByName('id'),
		    descripcion: 	listakioscos.fieldByName('descripcion'),
		    domicilio:		listakioscos.fieldByName('domicilio'),
		    lat:			listakioscos.fieldByName('lat'),
		    lng:			listakioscos.fieldByName('lng')
	  	});	
	  	//Etiqueta de título
		var Title = Ti.UI.createLabel({
		    color:'black',
		    font:{
		    	fontFamily:'Arial', 
		    	fontSize:Alloy.Globals.defaultFontSize + 25, 
		    	fontWeight:'bold'
	    	},
	    	left:5, 
		    top: 1,
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
				fontSize:Alloy.Globals.defaultFontSize + 10, 
				fontWeight:'normal'
		 	},
		 	left:5, 
		    width:Ti.UI.SIZE,
		    height: Ti.UI.SIZE,
		    text:			listakioscos.fieldByName('domicilio')			    
	  	});
	  	row.add(SubTitle);
	  	
	  	if (veces < listakioscos.rowCount) {	  	
	  		row.add(Ti.UI.createView({top:1, bottom:5,height: "1dp",width: "95%",backgroundColor:"#cacaca"}));
	  	}
				
		Data.push(row); 
		
		veces++;
			
	  	listakioscos.next();
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
		    backgroundSelectedColor:'#cacaca',
		    selectedColor: "#cccccc",			    
		    height:Ti.UI.SIZE,
		    width:Ti.UI.SIZE,
		    layout: 'vertical',
		    rightImage : '/images/own/16x16/image_text.png',
		    top: 1,
		    bottom: 1, 
		    title: 			listatramiteskioscos.fieldByName('descripcion'),		    
		    id_tramite:		listatramiteskioscos.fieldByName('id'),
		    id_ficha_retys:	listatramiteskioscos.fieldByName('id_ficha_retys'),
		    descripcion: 	listatramiteskioscos.fieldByName('descripcion')
	  	});
	  	//Etiqueta de título
		var Title = Ti.UI.createLabel({
		    color:'Black',
		    font:{
		    	fontFamily:'Arial', 
		    	fontSize:Alloy.Globals.defaultFontSize + 12
		    },
	    	left:2, 
		    top: 2,
		    width:Ti.UI.SIZE,
		    height: Ti.UI.SIZE,
		    text: 			listatramiteskioscos.fieldByName('descripcion')
		});
	  	row.add(Title);
	  	
	  	if (veces < listatramiteskioscos.rowCount) {		  	
	  		row.add(Ti.UI.createView({top:1, bottom:5,height: "1dp",width: "95%",backgroundColor:"#cacaca"}));
	  	}
								
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
	if ($.vistaficharetys.visible) {
		$.vistaficharetys.visible = false;
	} else if ($.vistatramites.visible) {
		$.vistatramites.visible = false;
	} else {
		$.index.close();
	} 
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
				
		function CrearLabelTitulo(label){
			var TitleLabel = Ti.UI.createLabel({
				color:'black',
				font: {
			        fontFamily:'Helveltica',
			        fontSize: '18dp',
			        fontStyle: 'normal',
			        fontWeight: 'bold'
			    },
			    width:"27%",
				height:Ti.UI.SIZE,
				left: 1,
			    text:label
			});
			return TitleLabel;			
		};
		
		function CrearLabelData(obj){
			var rowdata  = Ti.UI.createView({
			    layout:"vertical",
				width:Ti.UI.SIZE,
				height:Ti.UI.SIZE
			}),
				dato = false;
				
			if (typeof obj === 'object') {
			
				for(var item in obj) {
					if (obj.length > 0){
						var DataLabel = Ti.UI.createLabel({
							color:'black',
							font: {
						        fontFamily:'Helveltica',
						        fontSize: '18dp',
						        fontStyle: 'normal',		        
						    },
						    left:5,
							width:"69%",
							height:Ti.UI.SIZE,
						    text:obj[item]
						});
						rowdata.add(DataLabel);
						dato = true;
					}
				}
			} else {
				if (obj.length > 0){
					var DataLabel = Ti.UI.createLabel({
						color:'black',
						font: {
					        fontFamily:'Helveltica',
					        fontSize: '18dp',
					        fontStyle: 'normal',		        
					    },
					    left:5,
						width:"69%",
						height:Ti.UI.SIZE,
					    text:obj
					});
					rowdata.add(DataLabel);
					dato = true;
				}
			}
			
			if (!dato){
				var DataLabel = Ti.UI.createLabel({
					color:'black',
					font: {
				        fontFamily:'Helveltica',
				        fontSize: '18dp',
				        fontStyle: 'normal',		        
				    },
				    left:5,
					width:"69%",
					height:Ti.UI.SIZE,
				    text:'---'
				});
				rowdata.add(DataLabel);
			}
			
			return rowdata;			
		}
		
		function CreaBloque(titulo,data){
			//vista principal
			var vista  = Ti.UI.createView({
			    layout:"horizontal",
				width:Ti.UI.SIZE,
				height:Ti.UI.SIZE,			
			});	
			
			vista.add( CrearLabelTitulo(titulo));		
			vista.add( CrearLabelData  (data));
			
			return vista;
		}
		
		for (var d = $.scrllvw.children.length-1; d >= 0; d--) {
		    $.scrllvw.remove($.scrllvw.children[d]);
		}
				
		//vista principal
		var data_ficha_retys = Ti.UI.createView({		    
		    layout:"vertical",
			left:5,
			right:5,
			top:5,
			bottom:5,
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE
		});
					
		data_ficha_retys.add( CreaBloque('Nombre',data.nombre) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Descripción',data.descripcion) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Tipo',data.tipo) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Fecha de validación',data.fecha_validacion) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('¿A quién va dirigido?',data.a_quien_va_dirigido) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Requisitos',data.requisitos) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
						
		data_ficha_retys.add( CreaBloque('Documentos',data.documentos) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));

		data_ficha_retys.add( CreaBloque('Observaciones',data.observaciones) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));		
		
		data_ficha_retys.add( CreaBloque('Costos',data.costos) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Nota de Costos',data.costos_nota) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Formas de pago',data.forma_pago) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Pasos a seguir para realizar el trámite',data.pasos) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Tiempo de respuesta',data.tiempo_respuesta) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Formatos autorizados',data.formatos_autorizados) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Medios de impugnación',data.medios_impugnacion) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		data_ficha_retys.add( CreaBloque('Afirmativa Ficta',data.Afirmativa_Ficta) );
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
		
		var rowdata  = Ti.UI.createView({
		    layout:"vertical",
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE
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
		data_ficha_retys.add(Ti.UI.createView({top:5, bottom:5,height: "1dp",width: "99%",backgroundColor:"#cacaca"}));
				
		data_ficha_retys.add( CreaBloque('Normatividad',data.normatividad) );
		
		$.scrllvw.add(data_ficha_retys);
				
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
	 	timeout : 15000,
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
					return;					
				}
			}
			catch (e) {
				Ti.API.debug(e.message);
		  		errorresponse.show();
			}
						
			if (json.length == 0) {
				nodata.show();
		 	} else {
		 		if (json.exito == 1) {
	 				callback (json);
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

cambia_vista(1);

$.index.open();