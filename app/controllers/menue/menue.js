var option = Alloy.createController('/menue/option', {
	image 			: '/images/own/128x128/photo_zoom.png',
    title   		: 'Kioscos de Gobierno',
    subtitle		: 'Muestra en el mapa los Kioscos más cercanos a tu ubicación...',
    description		: 'Mediante el posicionamiento GPS, permite ubicar en el mapa los distintos Kioscos de Gobierno y su proximidad con respecto a su ubicación, en caso de no tener GPS activo, sólo se mostrarán las ubicaciónes de los Kioscos, así mismo tendrá la opción de revisar una lista con los Kioscos que gobierno tiene a sus servicio...',
    require			: { 
    					gps			: true,
    					internet 	: true    					
    				 },
    activityIdtr	: $.activityIndicator,
    callcontroller	: "options/kioscos/index"
}).getView();

$.panel_opciones.add(option);

option = Alloy.createController('/menue/option', {
	image 			: '/images/own/128x128/note_tagged.png',
    title   		: 'Módulos CURP',
    subtitle		: 'Muestra en el mapa lo Módulos CURP más cercanos a tu ubicación...',
    description		: 'Mediante el posicionamiento GPS, permite ubicar en el mapa los distintos Módulos CURP de Gobierno y su proximidad con respecto a su ubicación, en caso de no tener GPS activo, sólo se mostrarán las ubicaciónes de los Módulos CURP, así mismo tendrá la opción de revisar una lista con los Módulos CURP que gobierno tiene a sus servicio...',
    require			: { 
    					gps			: true,
    					internet 	: true    					
    				  },
  	activityIdtr	: $.activityIndicator,
    callcontroller	: "options/kioscos/index"
}).getView();

$.panel_opciones.add(option);

option = Alloy.createController('/menue/option', {
	image 			: '/images/own/128x128/rss.png',
    title   		: 'Zona Internet Gratuita',
    subtitle		: 'Muestra en el mapa los Espacios con Internet gratuito más cercanos a tu ubicación...',
    description		: 'Mediante el posicionamiento GPS, permite ubicar en el mapa los distintos espacios con Internet y su proximidad con respecto a su ubicación, en caso de no tener GPS activo, sólo se mostrarán las ubicaciónes de los espacios con Internét, así mismo tendrá la opción de revisar una lista con los espacios con Internet que gobierno tiene a sus servicio...',
    require			: { 
    					gps			: true,
    					internet 	: true    					
    				  },
  	activityIdtr	: $.activityIndicator,
    callcontroller	: "options/kioscos/index"
}).getView();

$.panel_opciones.add(option);

option = Alloy.createController('/menue/option', {
	image 			: '/images/own/128x128/user_starred.png',
    title   		: 'Directorio Integral',
    subtitle		: 'Consulta al Directorio Integral de Gobierno del Estado de Colima...',
    description		: 'Haga las busquedas en el directorio para consultar los datos de ubicación y contacto de algún funcionario de Gobierno del Estado de Colima...',
    require			: { 
    					gps			: false,
    					internet 	: true    					
    				  },
    activityIdtr	: $.activityIndicator,				  
    callcontroller	: "options/kioscos/index"
}).getView();

$.panel_opciones.add(option);

option = Alloy.createController('/menue/option', {
	image 			: '/images/own/128x128/note_starred.png',
    title   		: 'RETyS',
    subtitle		: 'Registro Estatal de Trámites y Servicios...',
    description		: 'Consulte la información completa sobre algun trámite en específico, lugares donde poder realizarlos, requisitos, horarios de atención, entre otras...',
    require			: { 
    					gps			: false,
    					internet 	: true    					
    				  },
    activityIdtr	: $.activityIndicator,				  
    callcontroller	: "options/kioscos/index"
}).getView();

$.panel_opciones.add(option);
