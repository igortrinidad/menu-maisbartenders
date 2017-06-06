cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "de.fastr.phonegap.plugins.injectView.inject",
        "file": "plugins/de.fastr.phonegap.plugins.injectView/www/inject.js",
        "pluginId": "de.fastr.phonegap.plugins.injectView",
        "clobbers": [
            "inject"
        ]
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-whitelist": "1.3.2",
    "de.fastr.phonegap.plugins.injectView": "0.2.0",
    "cordova-plugin-inappbrowser": "1.7.1"
};
// BOTTOM OF METADATA
});