// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  leaveBaseUrl: 'http://must-hp:8950',
  expenseBaseUrl: 'http://must-hp:7672',
  activityBaseUrl: 'http://must-hp:8800',
  collaboratorBaseUrl: 'http://must-hp:8900',
  clientBaseUrl: 'http://must-hp:8801',
  zuulBaseUrl: 'http://must-hp:9003'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
