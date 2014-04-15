var args = arguments[0] || {};

$.option_img.image = args.image;
$.option_title.text = args.title || '';
$.option_subtitle.text = args.subtitle || '';
 
var 
action_description = function(){	
	var
	close_fnc = function(){
		option.vw_dialog.visible = false;
		option = null;
	},
	option = Alloy.createController('menue/dialog', {
				image 			: 'images/own/48x48/doc_lines.png',
                title   		: 'Kioscos de Gobierno',
                message			: 'aqui va el mensaje',
                close			: close_fnc
    }).getView();
    
},
action_require = function(){
	alert('action_require');
}, 
action_open = function(){
	alert('action_open');
};