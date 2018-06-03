// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  firebase: {
  	apiKey: "AIzaSyA1CE9QG2cboXmctmn-dYMzNE8qM8fhZLs",
    authDomain: "uiggy-app.firebaseapp.com",
    databaseURL: "https://uiggy-app.firebaseio.com",
    projectId: "uiggy-app",
    storageBucket: "uiggy-app.appspot.com",
    messagingSenderId: "628603710206"
  },

  googleMapsKey: 'AIzaSyA2wcOoRkhD4gAd7oeGSEfC09duZLwfmzs',

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
