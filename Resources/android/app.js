var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Width = Titanium.Platform.displayCaps.platformWidth;

Alloy.Globals.Height = Titanium.Platform.displayCaps.platformHeight;

Alloy.Globals.Theme = {
    backgroundColor: "#cacaca",
    dividerColor: "#cococo",
    activityindicator: {
        style: Titanium.UI.ActivityIndicatorStyle.BIG
    }
};

var TamanioImagenBase = 60, TamanioTextoBase = 15;

Alloy.Globals.Imagen = {
    enorme: TamanioImagenBase + TamanioImagenBase / 2 + "dp",
    grande: TamanioImagenBase + TamanioImagenBase / 3 + "dp",
    mediana: TamanioImagenBase + "dp",
    pequenia: TamanioImagenBase - TamanioImagenBase / 3 + "dp",
    miniatura: TamanioImagenBase - TamanioImagenBase / 2 + "dp"
};

Alloy.Globals.Fuente = {
    fontFamily: "Helveltica",
    colorTitulo: "#000",
    colorSubtitulo: "#A2A2A2",
    colorActivityIndicator: "red",
    tamanioFuenteTitulo: TamanioTextoBase + 10 + "dp",
    tamanioFuenteSubTitulo: TamanioTextoBase + "dp",
    tamanioFuenteLista: TamanioTextoBase + "dp",
    tamanioFuenteSubLista: TamanioTextoBase - 3 + "dp",
    tamanioFuenteTexto: TamanioTextoBase - 3 + "dp",
    tamanioActivityIndicator: TamanioTextoBase + 10 + "dp"
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