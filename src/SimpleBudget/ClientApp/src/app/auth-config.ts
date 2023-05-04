import { LogLevel, Configuration, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
  auth: {
    clientId: '288987e5-09f1-49e9-a010-984ffcaa1115',
    authority: 'https://login.microsoftonline.com/ce6adbfd-08c9-4e50-b206-5a1ac8226e9f',
    redirectUri: '/', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
    postLogoutRedirectUri: '/'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE,
  },
  system: {
    /**
     * Below you can configure MSAL.js logs. For more information, visit:
     * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
     */
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Error,
      piiLoggingEnabled: false
    }
  }
}

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Popup,
  protectedResourceMap: new Map([
    ['/api', ['api://288987e5-09f1-49e9-a010-984ffcaa1115/app.user']]
  ])
  //simpleBudgetApi: {
  //  endpoint: "/api",
  //  scopes: ['api://288987e5-09f1-49e9-a010-984ffcaa1115/app.user']
  //}
}

export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Popup,
  authRequest: {
    scopes: ['api://288987e5-09f1-49e9-a010-984ffcaa1115/app.user']
  },
  loginFailedRoute: '/login-failed'
}
