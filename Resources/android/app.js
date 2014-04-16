var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Width = Titanium.Platform.displayCaps.platformWidth;

Alloy.Globals.Height = Titanium.Platform.displayCaps.platformHeight;

Alloy.Globals.Theme = {
    backgroundColor: "#cacaca",
    backgroundImage: "/images/own/background/logo_gob.png",
    dividerColor: "#363636",
    activityindicator: {
        style: Titanium.UI.ActivityIndicatorStyle.BIG
    }
};

Alloy.Globals.Menue = {
    bordercolor: "#6F6E6E",
    borderwidth: "3",
    borderradius: "10"
};

var TamanioImagenBase = 60, TamanioTextoBase = 15;

Alloy.Globals.Imagen = {
    background: "250dp",
    superenorme: TamanioImagenBase + TamanioImagenBase + "dp",
    enorme: TamanioImagenBase + TamanioImagenBase / 2 + "dp",
    grande: TamanioImagenBase + TamanioImagenBase / 3 + "dp",
    mediana: TamanioImagenBase + "dp",
    pequenia: TamanioImagenBase - TamanioImagenBase / 3 + "dp",
    miniatura: TamanioImagenBase - TamanioImagenBase / 2 + "dp"
};

Alloy.Globals.Fuente = {
    fontFamily: "Helveltica",
    colorTitulo: "#BD1B1B",
    colorSubtitulo: "#363636",
    colorTexto: "#000",
    colorActivityIndicator: "red",
    tamanioFuenteTitulo: TamanioTextoBase + 13 + "dp",
    tamanioFuenteSubTitulo: TamanioTextoBase + 3 + "dp",
    tamanioFuenteLista: TamanioTextoBase + 3 + "dp",
    tamanioFuenteSubLista: TamanioTextoBase - 1 + "dp",
    tamanioFuenteTexto: TamanioTextoBase - 1 + "dp",
    tamanioActivityIndicator: TamanioTextoBase + "dp"
};

Alloy.Globals.defaultFontSize = 10;

Alloy.Globals.databasepath = "/databases/";

Alloy.Globals.databases = {
    kioscos: "kioscos.sqlite"
};

Alloy.Globals.resources = {
    appTitle: "Gobierno del Estado de Colima",
    header: {
        titulo: "Info[Gob] Colima",
        subtitulo: "Información de puntos de interéz..."
    },
    ActivityIndicator: "Procesando, favor de esperar..."
};

Alloy.createController("index");