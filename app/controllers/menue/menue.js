var option = Alloy.createController('/menue/option', {
	image 			: 'images/own/48x48/doc_lines.png',
    title   		: 'Kioscos de Gobierno',
    subtitle		: 'Ubica en el mapa los Kioscos más cercanos a tu ubicación...',
    description		: 'Mediante el posicionamiento GPS, permite ubicar los distintos Kioscos de Gobierno, en caso de no tener GPS activo se mostrará una lista con las ubicaciones...',
    require			: 'requerimientos'                                           
}).getView();

$.panel_opciones.add(option);