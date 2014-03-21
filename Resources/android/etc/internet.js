var verificasihayinternet = function() {
    var internet = false;
    internet = Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? false : true;
    return internet;
};