var	Data = [], //Contenedor de opciones en control
	Image_Size = 55, //Tamaño de la imagen de la opción
	imgpath = 'images/own/48x48/',	
	Opciones = [ 
				 {
					title: 'Kioscos de Gobierno',
					subtitle: 'Ubica en el mapa los Kioscos más cercanos a tu ubicación...',
					description: 'Mediante el posicionamiento GPS, permite ubicar los distintos Kioscos de Gobierno, en caso de no tener GPS activo se mostrará una lista con las ubicaciones...',
					image: imgpath + 'doc_lines.png'
				 }, 
				 {
					title: 'Módulos CURP',
					subtitle: 'Ubica en el mapa los diferentes módulos de atención curp más cercanos a tu ubicación...',
					description: 'Descrioción aqui...',
					image: imgpath + 'cert.png'
				 },
				 {
					title: 'Zona Internet',
					subtitle: 'Ubica en el mapa los espacios con internet gratuito mas cercanos a tu ubicación...',
					description: 'Descrioción aqui...',
					image: imgpath + 'rss.png'
				 },
				 {
					title: 'Directorio Integral',
					subtitle: 'Realiza busquedas en el Directorio Integral de Gobierno del Estado de Colima...',
					description: 'Descrioción aqui...',
					image: imgpath + 'notepad.png'
				 },
				 {
					title: 'RETyS',
					subtitle: 'Consulta el Registro Estatal de Trámites y Servicios...',
					description: 'Descrioción aqui...',
					image: imgpath + 'layers_2.png'
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
  	var 
  		tamFuenteTitulo = 12,
		tamFuenteSubTitulo = 5,  		  	
		Title = Ti.UI.createLabel({
	    color:'#576996',
	    font:{
	    	fontFamily:'Arial', 
	    	fontSize:Alloy.Globals.defaultFontSize + tamFuenteTitulo, 
	    	fontWeight:'bold'
    	},
	    text: Opciones[i].title,
	    left:Image_Size + 20, 
	    top: Image_Size - (Alloy.Globals.defaultFontSize + tamFuenteTitulo) - (Alloy.Globals.defaultFontSize + tamFuenteSubTitulo) - 5,
	    width:Ti.UI.SIZE, 
	    height: Ti.UI.SIZE
	});
  	row.add(Title);
  	//Etiqueta de subtítulo
  	var SubTitle = Ti.UI.createLabel({
	    color:'#222',
	    font:{
			fontFamily:'Arial', 
			fontSize:Alloy.Globals.defaultFontSize + tamFuenteSubTitulo, 
			fontWeight:'normal'
	 	},
	    text:Opciones[i].subtitle,
	    left:Image_Size + 20, 
	    top: Image_Size - (Alloy.Globals.defaultFontSize + tamFuenteSubTitulo) - 5,
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