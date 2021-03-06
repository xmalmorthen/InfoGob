//Dimensines ancho y alto
Alloy.Globals.Width = Titanium.Platform.displayCaps.platformWidth; //Dimensión en Ancho
Alloy.Globals.Height = Titanium.Platform.displayCaps.platformHeight; //Dimensión en Alto
//******************************************************************************************************

//Configs
Alloy.Globals.cnfg = {
	wstimeout			: 5000
};

//Theme
Alloy.Globals.Theme = {
	backgroundColor 	: '#cacaca',
	backgroundImage		: '/images/own/background/logo_gob.png',
	dividerColor		: '#363636',
	searchbarcolor		: '#cacaca',
	activityindicator	: {
		style			: Titanium.UI.ActivityIndicatorStyle.BIG		
	}		
};
//******************************************************************************************************

Alloy.Globals.Menue ={
	bordercolor			: '#6F6E6E',
	borderwidth			: '3',
	borderradius		: '10'
};

var 
	TamanioImagenBase = 60,
	TamanioTextoBase = 15;

//Tamaño de imagenes
Alloy.Globals.Imagen = {
	background	:  (250) + 'dp',
	superenorme :  (TamanioImagenBase + TamanioImagenBase) + 'dp',
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
	colorTitulo				: '#BD1B1B',
 	colorSubtitulo			: '#363636',
 	colorTexto				: '#000',
 	colorActivityIndicator	: 'red',
 	tamanioFuenteTitulo		: (TamanioTextoBase + 13) + 'dp',
 	tamanioFuenteSubTitulo	: (TamanioTextoBase + 3) + 'dp',
 	tamanioFuenteLista		: (TamanioTextoBase + 3) + 'dp',
 	tamanioFuenteSubLista	: (TamanioTextoBase - 1) + 'dp',
 	tamanioFuenteTexto		: (TamanioTextoBase - 1)  + 'dp',
 	tamanioActivityIndicator: (TamanioTextoBase + 7) + 'dp'
};
//******************************************************************************************************

//Path de base de datos
Alloy.Globals.databasepath = '/databases/'; //Ruta a base de datos
//Base de datos
Alloy.Globals.databases = {
	settings				: 'settings.sqlite', //configuraciones
	kioscos					: 'kioscos.sqlite' //Kioscos
};
//******************************************************************************************************

//Resources
Alloy.Globals.resources = {
	appTitle					: 'Gobierno del Estado de Colima',
	header						: {
		titulo						: 'Info[Gob] Colima',
		subtitulo					: 'Información de puntos de interéz...'
	},
	ActivityIndicator			: 'Procesando, favor de esperar...',
	options						: {
		kioscos					: {
			list_title				: 'Lista de Kioscos de servicios'
		}
	}
};
//******************************************************************************************************

// Intent object to launch the application 
/*
	var intent = Ti.Android.createIntent({
	    flags : Ti.Android.FLAG_ACTIVITY_CLEAR_TOP | Ti.Android.FLAG_ACTIVITY_NEW_TASK,
	    // Substitute the correct classname for your application
	    className : 'com.developc.infogob.InfogobActivity',
	});
	intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
	
	// Create a PendingIntent to tie together the Activity and Intent
	var pending = Titanium.Android.createPendingIntent({
	    intent: intent,
	    flags: Titanium.Android.FLAG_UPDATE_CURRENT
	});
	
	// Create the notification
	var notification = Titanium.Android.createNotification({
	    // icon is passed as an Android resource ID -- see Ti.App.Android.R.
	    icon: Ti.App.Android.R.drawable.appicon,
	    contentTitle: 'Something Happened',
	    contentText : 'Click to return to the application.',
	    contentIntent: pending
	});
	// Send the notification.
	Titanium.Android.NotificationManager.notify(1, notification);
*/