cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/de.fastr.phonegap.plugins.injectView/www/inject.js",
        "id": "de.fastr.phonegap.plugins.injectView.inject",
        "pluginId": "de.fastr.phonegap.plugins.injectView",
        "clobbers": [
            "inject"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
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
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-splashscreen": "4.0.3",
    "de.fastr.phonegap.plugins.injectView": "0.2.0",
    "cordova-plugin-inappbrowser": "1.7.1"
}
// BOTTOM OF METADATA
});