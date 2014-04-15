//Dimensines ancho y alto
Alloy.Globals.Width = Titanium.Platform.displayCaps.platformWidth; //Dimensión en Ancho
Alloy.Globals.Height = Titanium.Platform.displayCaps.platformHeight; //Dimensión en Alto
//******************************************************************************************************

//Theme
Alloy.Globals.Theme = {
	backgroundColor 	: '#cacaca',
	dividerColor		: '#000',
	activityindicator	: {
		style			: Titanium.UI.ActivityIndicatorStyle.BIG		
	}		
};
//******************************************************************************************************

var 
	TamanioImagenBase = 60,
	TamanioTextoBase = 15;

//Tamaño de imagenes
Alloy.Globals.Imagen = {
	enorme 		:  (TamanioImagenBase + (TamanioImagenBase / 2)) + 'dp',	
	grande 		:  (TamanioImagenBase + (TamanioImagenBase / 3)) + 'dp',
	mediana 	:  (TamanioImagenBase) + 'dp',
	pequenia 	:  (TamanioImagenBase - (TamanioImagenBase / 3)) + 'dp',
	miniatura 	:  (TamanioImagenBase - (TamanioImagenBase / 2)) + 'dp'
};
//******************************************************************************************************

//Fuente por default
Alloy.Globals.Fuente = {
	fontFamily				: 'Helveltica',
	colorTitulo				: '#000',
 	colorSubtitulo			: '#A2A2A2',
 	colorTexto				: '#000',
 	colorActivityIndicator	: 'red',
 	tamanioFuenteTitulo		: (TamanioTextoBase + 10) + 'dp',
 	tamanioFuenteSubTitulo	: (TamanioTextoBase) + 'dp',
 	tamanioFuenteLista		: (TamanioTextoBase) + 'dp',
 	tamanioFuenteSubLista	: (TamanioTextoBase - 3) + 'dp',
 	tamanioFuenteTexto		: (TamanioTextoBase - 3)  + 'dp',
 	tamanioActivityIndicator: (TamanioTextoBase) + 'dp'
};
//******************************************************************************************************

Alloy.Globals.defaultFontSize = 10; //Tamaño de fuente por default

//Path de base de datos
Alloy.Globals.databasepath = '/databases/'; //Ruta a base de datos
//Base de datos
Alloy.Globals.databases = {
	kioscos: 'kioscos.sqlite' //Kioscos
};
//******************************************************************************************************

//Resources
Alloy.Globals.resources = {
	appTitle					: 'Gobierno del Estado de Colima',
	header						: {
		titulo						: 'Info[Gob] Colima',
		subtitulo					: 'Información de puntos de interéz...'
	},
	ActivityIndicator			: 'Procesando, favor de esperar...'
};
//******************************************************************************************************