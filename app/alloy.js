// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//Obtiene el tamaño de fuente por default
function defaultFontSize(){
	var defaultFontSize = 10;
	if (Ti.Platform.name === 'android'){
		defaultFontSize = 10;
	} else {
		defaultFontSize = 8;		
	} 
	return defaultFontSize;
};
Alloy.Globals.defaultFontSize = defaultFontSize();

//Ruta a base de datos
Alloy.Globals.databasepath = '/databases/';

//Base de datos
Alloy.Globals.databases = {
	kioscos: 'kioscos.sqlite'
};