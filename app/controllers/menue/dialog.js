var args = arguments[0] || {};

$.img_header.image = args.image;
$.header_titulo.text = args.title || '';
$.content.text = args.message || '';

$.img_close.fireEvent('click',args.close);