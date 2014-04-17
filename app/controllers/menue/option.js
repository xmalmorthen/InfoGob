var args = arguments[0] || {};

$.option_img.image = args.image;
$.option_title.text = args.title || '';
$.option_subtitle.text = args.subtitle || '';
$.option_description.text = args.description || '';

$.img_gps.visible = args.require.gps;
$.img_internet.visible = args.require.internet;

var 
option = args.callcontroller,
internet_info = function(){
	Ti.UI.createAlertDialog({
	    cancel: 0,
	    buttonNames: ['Aceptar'],
	    message: 'Es necesario contar con Internét o Plan de Datos...',
	    title: 'Conexión a Internet'
	}).show();
},
gps_info = function(){
	Ti.UI.createAlertDialog({
	    cancel: 0,
	    buttonNames: ['Aceptar'],
	    message: 'Se recomienda tener el GPS habilitado...',
	    title: 'Posicionamiento GPS'
	}).show();
}, 
action_open = function(){
	Alloy.createController(option).getView().open();
};