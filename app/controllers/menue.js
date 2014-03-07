var defaultFontSize = Ti.Platform.name === 'android' ? 10 : 8, //Tamaño de fuente
	Data = [], //Contenedor de opciones en control
	Image_Size = 70, //Tamaño de la imagen de la opción	
	Opciones = [ 
				 {
					title: 'Kioscos de Gobierno',
					subtitle: 'Ubica en el mapa los Kioscos más cercanos a tu ubicación...',
					description: 'Mediante el posicionamiento GPS, permite ubicar los distintos Kioscos de Gobierno, en caso de no tener GPS activo se mostrará una lista con las ubicaciones...',
					image:'appicon.png'
				 }, 
				 {
					title: 'Módulos CURP',
					subtitle: 'Ubica en el mapa los diferentes módulos de atención curp más cercanos a tu ubicación...',
					description: 'Descrioción aqui...',
					image:'appicon.png'
				 },
				 {
					title: 'Zona Internet',
					subtitle: 'Ubica en el mapa los espacios con internet gratuito mas cercanos a tu ubicación...',
					description: 'Descrioción aqui...',
					image:'appicon.png'
				 },
				 {
					title: 'Directorio Integral',
					subtitle: 'Realiza busquedas en el Directorio Integral de Gobierno del Estado de Colima...',
					description: 'Descrioción aqui...',
					image:'appicon.png'
				 },
				 {
					title: 'RETyS',
					subtitle: 'Consulta el Registro Estatal de Trámites y Servicios...',
					description: 'Descrioción aqui...',
					image:'appicon.png'
				 },
			   ]; //Lista de opciones a mostrar en el menú
	
//Constructor del menu a partir del objeto de opciones
for (var i=0; i<Opciones.length ; i++){
	//Fila del tableview
	var row = Ti.UI.createTableViewRow({
	    backgroundSelectedColor:'#cacaca',
	    selectedColor: "#cccccc",
	    rowIndex:i,
	    descripcion: Opciones[i].description,
	    height:Ti.UI.SIZE,
	    title: Opciones[i].title,
  	});	
	//Imagen de la opción
	var image = Ti.UI.createImageView({
    	image: '/' + Opciones[i].image,
    	left:10, 
    	top:5,
    	width:Image_Size, 
    	height:Image_Size,
    	bottom: 10
  	});
  	row.add(image);
  	//Etiqueta de título
	var Title = Ti.UI.createLabel({
	    color:'#576996',
	    font:{
	    	fontFamily:'Arial', 
	    	fontSize:defaultFontSize+14, 
	    	fontWeight:'bold'
    	},
	    text: Opciones[i].title,
	    left:Image_Size + 15, 
	    top: Image_Size - (defaultFontSize + 14) - (defaultFontSize + 1) - 10,
	    width:Ti.UI.SIZE, 
	    height: Ti.UI.SIZE
	});
  	row.add(Title);
  	//Etiqueta de subtítulo
  	var SubTitle = Ti.UI.createLabel({
	    color:'#222',
	    font:{
			fontFamily:'Arial', 
			fontSize:defaultFontSize + 1, 
			fontWeight:'normal'
	 	},
	    text:Opciones[i].subtitle,
	    left:Image_Size + 15, 
	    top: Image_Size - (defaultFontSize + 1) - 10 + 4,
	    width:Ti.UI.SIZE
  	});
  	row.add(SubTitle);
 	
 	Data.push(row); 	
};

$.Menu_Principal.data = Data;  

//onclick - TableView - Menu_Principal - menue.xml
var click_opc = function (e){
	var index = e.index;
	switch (index) {
		case 0:
			Alloy.createController("/options/kioscos/index").getView().open();				
		    break;
		case 1:
		    alert('CURP');
		    break;
	    case 2:
		    alert('Internet');
		    break;
	    case 3:
		    alert('DI');
		    break;
	    case 4:
		    alert('RETyS');
		    break;
		default:
		    alert('Desconocido');
		    break;
	}
};

//onLongpress - TableView - Menu_Principal - menue.xml
var lng_press_opc = function (e){
	var index = e.index,
		rowdata = e.rowData,
		descripcion = rowdata.descripcion;
	
	Ti.UI.createAlertDialog({
        title: "Info[Gob]",
        message: descripcion,
        buttonNames: ['Cerrar'],
        cancel:0
    }).show();
};