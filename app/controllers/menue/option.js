var args = arguments[0] || {};

$.option_img.image = args.image;
$.option_title.text = args.title || '';
$.option_subtitle.text = args.subtitle || '';
$.option_description.text = args.description || '';
  
var 
action_require = function(){
	var
	close_fnc = function(){
		dlg.vw_dialog.visible = false;
		dlg = null;
	},
	dlg = Alloy.createController('/menue/dialog', {
				image 			: 'images/own/48x48/doc_lines.png',
                title   		: 'Kioscos de Gobierno',
                message			: 'Prueba de dialogo',
                close			: close_fnc
    }).getView();    
}, 
action_open = function(){
	alert(args.subtitle || '');
};