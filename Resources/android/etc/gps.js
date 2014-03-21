function traducircodigodeerror(code) {
    if (null == code) return null;
    switch (code) {
      case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
        return "Locación desconocida";

      case Ti.Geolocation.ERROR_DENIED:
        return "Acceso denegado";

      case Ti.Geolocation.ERROR_NETWORK:
        return "Error de red";

      case Ti.Geolocation.ERROR_HEADING_FAILURE:
        return "Falló al detectar el encabezado";

      case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
        return "Acceso denegado al monitoreo de región";

      case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
        return "Acceso fallido al monitoreo de región";

      case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
        return "Disposición de la región de monitorización retrazada";
    }
}

Titanium.Geolocation.preferredProvider = "gps";

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

Titanium.Geolocation.distanceFilter = 10;

var GPS = {
    active: false,
    error: {
        success: null,
        codigo: null,
        error: null,
        mensaje: null
    },
    geolocalization: {
        longitude: null,
        latitude: null,
        altitude: null,
        heading: null,
        accuracy: null,
        speed: null,
        timestamp: null,
        altitudeAccuracy: null
    }
};

var ConfigurarGPS = function() {
    var settingsIntent = Titanium.Android.createIntent({
        action: "android.settings.LOCATION_SOURCE_SETTINGS"
    });
    var curActivity = Ti.Android.currentActivity;
    curActivity.startActivity(settingsIntent);
};

var ObtenerPosicionGPS = function() {
    GPS.active = false;
    GPS.error.codigo = null;
    GPS.error.mensaje = null;
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.success && null == e.error) {
            GPS.geolocalization.longitude = e.coords.longitude;
            GPS.geolocalization.latitude = e.coords.latitude;
            GPS.geolocalization.altitude = e.coords.altitude;
            GPS.geolocalization.heading = e.coords.heading;
            GPS.geolocalization.accuracy = e.coords.accuracy;
            GPS.geolocalization.speed = e.coords.speed;
            GPS.geolocalization.timestamp = e.coords.timestamp;
            GPS.geolocalization.altitudeAccuracy = e.coords.altitudeAccuracy;
            GPS.active = true;
            return;
        }
        GPS.active = false;
        GPS.error.success = e.success ? e.success : null;
        GPS.error.codigo = e.code ? e.code : null;
        GPS.error.error = e.error ? e.error : null;
        GPS.error.mensaje = e.code ? traducircodigodeerror(e.code) : null;
        Ti.API.info("getCurrentPosition : GPS ACTIVE: " + GPS.active + " - SUCCESS: " + GPS.error.success + " - CODIGO: " + GPS.error.codigo + " - ERROR: " + GPS.error.error + " - MENSAJE: " + GPS.error.mensaje);
    });
};