# POInt

POInt is a content sharing app that draws museum visitors’ attention to specific "points of interest" in the art objects around them.

This app is written using the Ionic framework, and can be run on both iOS and Android.

## Getting Started

To use this app you'll have to install Ionic (a Cordova-based platform for writing mobile apps using Angular.js)

```
npm install -g cordova ionic
npm install
```

We use Gulp to automate our build process (combining JavaScript files, compiling SCSS into CSS, etc.).

To watch for changes and recompile, run:

```
gulp watch
```

## Testing with Browser

Most of the app (except the iBeacon functionality) can be tested in the browser using this command:

```
ionic serve
```

This will open a browser window running the app.

## Testing with iOS Simulator

```
ionic build ios
ionic emulate ios
```

## Deplying to an iOS Device

You'll have to configure an iOS Developer Account first.

```
ionic build ios
ionic run ios --device
```
