//Verificar si hay internet
var verificasihayinternet = function(){
	var internet = false; //bandera utilizada para saber si el dispositivo tiene internet activo
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		internet = false;
	} else {
		internet = true;
	}
	return internet;
};