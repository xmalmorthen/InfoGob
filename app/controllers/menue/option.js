var args = arguments[0] || {};

$.option_img.image = args.image;
$.option_title.text = args.title || '';
$.option_subtitle.text = args.subtitle || '';
$.option_description.text = args.description || '';


  
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
                message			: decription,
                close			: close_fnc
    }).getView();
    
},
action_require = function(){
	alert(args.subtitle || '');
}, 
action_open = function(){
	alert(args.subtitle || '');
};