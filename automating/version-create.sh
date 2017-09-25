#!/bin/bash

echo "*****************************************";
echo "INITATED THE AUTOMATING PROCCESS TO CREATE A NEW APK AND NEW APP VERSION.";

version=(`env=production  node update-version.js`);
wait;
echo "*****************************************";
echo "Version of the app updated to ${version}.";

cd ../;

gulp --production;
wait;

npm run build;
wait;

cordova build android --release;
wait;

cordova build ios;
wait;

cd automating;

mkdir ../apk_versions/$version;

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore isaudavel.keystore ../platforms/android/build/outputs/apk/android-release-unsigned.apk isaudavel -storepass wp-isaudavel-21 -keypass wp-isaudavel-21;
wait;

<<<<<<< HEAD
zipalign -v 4 ../platforms/android/build/outputs/apk/android-release-unsigned.apk ../apk_versions/$version/APP-BUILDED-SIGNED.apk;
=======
zipalign -v 4 ../platforms/android/build/outputs/apk/android-release-unsigned.apk ../apk_versions/$version/APP-MB-SIGNED.apk;
>>>>>>> a680d352f228dc3abcb2284827b5d3a4322022ee

echo "TASK FINISHED.";
echo "*****************************************";