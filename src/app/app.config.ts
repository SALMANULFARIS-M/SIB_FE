import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './interceptors/auth.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useValue: authInterceptor,
    multi: true, // Allow multiple interceptors
  },provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
};

