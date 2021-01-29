// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendBaseURL: 'http://localhost:3531',
  imageurl: 'http://localhost:3531/uploads/',
  api_url: 'http://localhost:3531/api/'
  // backendBaseURL: 'https://ss.stagingsdei.com:3531/',
  //  imageurl:'http://54.190.192.105:6081/uploads/',
  //  api_url: 'https://ss.stagingsdei.com:3531/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
