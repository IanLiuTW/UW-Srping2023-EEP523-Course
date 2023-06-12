# EE P 523 A Sp 23: Mobile Applications For Sensing And Control

This README file serves as a note for the course. For assignments, please refer to the README files in the corresponding folders:

- Final project: Under the `FinalProject` directory.
- HW assignments: In the current directory.
- ICTE assignments: In the `ICTE` directory.
- Bonus assignments: In the `Bonus` directory.

## Commands

### Common

```shell
npx react-native start
npx react-native run-android

cd android && .\gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug --warning-mode=all && cd ..
detox test --configuration android.att.debug
```

### Run project

If dependencies are not installed:

```shell
npm install 
```

If running on physical device, run these commands first:

```shell
adb devices 
adb -s 27071JEGR06636 reverse tcp:8081 tcp:8081  
# adb -s LMV600TM67a08f9c reverse tcp:8081 tcp:8081
```

Start the server:

```shell
npx react-native start # optional
npx react-native run-android

# If having EPERM error with lstat:
cd android && ./gradlew clean && cd .. && npx react-native run-android
```

### Create project

```shell
npx react-native@latest init AwesomeProject
cd MyReactNativeApp
```

### Yarn

#### Installation

```shell
npm install -g yarn
yarn --version
```

#### Init

```shell
yarn init
```

#### Add package

```shell
yarn add PACKAGE_NAME
```

## References

### React Native

- [React Native - Introduction](https://reactnative.dev/docs/getting-started)
- [React Native - Components](https://reactnative.dev/docs/components-and-apis)
- [React Native - APIs](https://reactnative.dev/docs/accessibilityinfo)
- [React - Getting Started](https://17.reactjs.org/docs/getting-started.html)

- [Setting up the development environment](https://reactnative.dev/docs/environment-setup?guide=native)

### React

- [Getting Started](https://17.reactjs.org/docs/getting-started.html)

## Packages

### Testing - Jest

<https://jestjs.io/docs/getting-started>

```shell
npm install "jest@^29" --save-dev
```

### Testing - Detox

<https://wix.github.io/Detox/docs/introduction/getting-started/>
<https://wix.github.io/Detox/docs/api/device>

```shell
npm install -g detox-cli
npm install "jest@^29" --save-dev
npm install detox --save-dev
```

Init Detox

```shell
detox init
```

Change the emulator name in `.detoxrc.js`:

```shell
& "$env:ANDROID_HOME\emulator\emulator" -list-avds
```

Or using physical device by first checking if it is connected and use `android.att.*` when required:

```shell
adb devices
```

Build the app:

```shell
detox build --configuration android.emu.debug
detox build --configuration android.emu.release
detox build --configuration android.att.debug
detox build --configuration android.att.release

cd android && .\gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug --warning-mode=all
```

Run the test:

```shell
npx react-native start
```

```shell
cd ..
detox test --configuration android.att.debug
```

### Install @react-navigation/native & @react-navigation/stack

<https://github.com/react-navigation/react-navigation>
<https://reactnavigation.org/docs/getting-started/>

```shell
npm install @react-navigation/native react-native-screens react-native-safe-area-context
npm install @react-navigation/stack react-native-gesture-handler
```

### Install Axios

<https://github.com/axios/axios>
<https://axios-http.com/docs/intro>

```shell
npm install axios
npm install axios-hooks  # Optional: https://www.npmjs.com/package/axios-hooks
```

### AWS aws-sdk-js-v3

<https://github.com/aws/aws-sdk-js-v3#getting-started>
<https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/Package/-aws-sdk-client-dynamodb/>

```shell
npm install @aws-sdk/client-dynamod
npm install react-native-get-random-values
npm install react-native-url-polyfill
```

Basic usage:

```js
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const creds = {
  accessKeyId: "",
  secretAccessKey: ""
};


(async () => {
  const client = new DynamoDB({ region: "us-west-2", credentials: creds });
  try {
    const results = await client.listTables({});
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
})();
```

### Install

React Native Async Storage react-native-async-storage

<https://github.com/react-native-async-storage/async-storage>
<https://react-native-async-storage.github.io/async-storage/docs/install>

```shell
npm install @react-native-async-storage/async-storage
```

### Install react-native-permissions

<https://github.com/zoontek/react-native-permissions>

```shell
npm install react-native-permissions
```

### Install @react-native-community/geolocation

<https://github.com/michalchudziak/react-native-geolocation>

```shell
npm install @react-native-community/geolocation
```

### Install react-native-toast-message

<https://github.com/calintamas/react-native-toast-message/tree/945189fec9746b79d8b5b450e298ef391f8022fb>

```shell
npm install react-native-toast-message
```

### Install react-native-ble-manager

<https://github.com/innoveit/react-native-ble-manager>
<https://www.oneclickitsolution.com/blog/ble-plx-in-react-native/>

```shell
npm i react-native-ble-manager
```

Android - Update Manifest

```xml
// file: android/app/src/main/AndroidManifest.xml
<!-- Add xmlns:tools -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="YOUR_PACKAGE_NAME">

    <!--
      HACK: this permission should not be needed on android 12+ devices anymore,
      but in fact some manufacturers still need it for BLE to properly work :
      https://stackoverflow.com/a/72370969
    -->
    <uses-permission android:name="android.permission.BLUETOOTH" tools:remove="android:maxSdkVersion" />
    <!--
      should normally only be needed on android < 12 if you want to:
      - activate bluetooth programmatically
      - discover local BLE devices
      see: https://developer.android.com/guide/topics/connectivity/bluetooth/permissions#discover-local-devices.
      Same as above, may still be wrongly needed by some manufacturers on android 12+.
     -->
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" tools:remove="android:maxSdkVersion" />

    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" android:maxSdkVersion="28"/>
    <uses-permission-sdk-23 android:name="android.permission.ACCESS_FINE_LOCATION" android:maxSdkVersion="30"/>

    <!-- Only when targeting Android 12 or higher -->
    <!--
      Please make sure you read the following documentation
      to have a better understanding of the new permissions.
      https://developer.android.com/guide/topics/connectivity/bluetooth/permissions#assert-never-for-location
    -->

    <!-- Needed if your app search for Bluetooth devices. -->
     <!--
      If your app doesn't use Bluetooth scan results to derive physical location information,
      you can strongly assert that your app doesn't derive physical location.
    -->
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN"
                     android:usesPermissionFlags="neverForLocation" />
    <!-- Needed if you want to interact with a BLE device. -->
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
    <!-- Needed if your app makes the current device discoverable to other Bluetooth devices. -->
    <uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
...
```

### Install react-native-image-picker 🎆

```shell
npm install react-native-image-picker
```

Add permissions to `AndroidManifest.xml`:

File path: `\android\app\src\main\AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
```

~~Set `newArchEnabled` to true inside `android/gradle.properties`~~

### Install react-native-sensors 🎆

<https://github.com/react-native-sensors/react-native-sensors>

```shell
npm install react-native-sensors
```

### Install Expo modules

```shell
npx install-expo-modules@latest
```

- [expo-face-detector](https://docs.expo.dev/versions/v48.0.0/sdk/facedetector/)

```shell
npx expo install expo-face-detector
```

## Android

### Force Light Mode in Application

File path: `android/app/src/main/res/values/styles.xml`:

Change `<style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">`

to `<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">`

### Permissions

File path: `\android\app\src\main\AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```
