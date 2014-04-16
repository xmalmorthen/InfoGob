var args = arguments[0] || {};

$.img_header.image = args.image;
$.lbl_title.text = args.title || '';
$.content.text = args.message || '';

var Closesubviewficha = function(){
	args.close();
};