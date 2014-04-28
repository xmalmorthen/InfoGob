var deviceToken;

var CloudPush = require('ti.cloudpush');
CloudPush.retrieveDeviceToken({
	success : function deviceTokenSuccess(e) {
		deviceToken = e.deviceToken;
		alert('Device Token: ' + deviceToken);
		Ti.API.info('Device Token: ' + e.deviceToken);
	},
	error : function deviceTokenError(e) {
		alert('Failed to register for push! ' + e.error);
	}
});

CloudPush.debug = true;
CloudPush.enabled = true;
CloudPush.showTrayNotificationsWhenFocused = true;
CloudPush.focusAppOnPush = false;

var Cloud = require('ti.cloud');
Cloud.debug = true;

Cloud.Users.login({
    login: 'infogobpushnotification',
    password: '..121212qw'
}, function (e) {
    if (e.success) {
        alert("login success");
        defaultSubscribe();
    } else {
        alert('Error: ' + ((e.error + ' - ' + e.message) || JSON.stringify(e)));
    }
}); 

function defaultSubscribe() {
	Cloud.PushNotifications.subscribe({
		channel : 'alert',//'alert' is channel name
		device_token : deviceToken,
		type : 'android' //here i am using gcm, it is recomended one
	}, function(e) {
		if (e.success) {
			alert('Subscribed for Push Notification!');
		} else {
			alert('Subscrib error:' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

CloudPush.addEventListener('callback', function(evt) {
	alert(evt.payload);
});
CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
	Ti.API.info('@@## Tray Click Launched App (app was not running)');
});
CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
	Ti.API.info('@@## Tray Click Focused App (app was already running)');
});


$.index.open();
