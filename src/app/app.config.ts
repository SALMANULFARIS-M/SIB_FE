import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './core/interceptors/auth.interceptor'
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxSpinnerModule  } from "ngx-spinner";

export const appConfig: ApplicationConfig = {
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useValue: authInterceptor,
    multi: true, // Allow multiple interceptors
  },
  provideHttpClient(withFetch(), // Enable Fetch API
  withInterceptors([authInterceptor])), // Apply interceptors), // Enable fetch API
  importProvidersFrom(FontAwesomeModule, BrowserAnimationsModule,NgxSpinnerModule.forRoot()),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(
    withInterceptors([authInterceptor])), // Add interceptors here
  provideClientHydration(withEventReplay())]
};

