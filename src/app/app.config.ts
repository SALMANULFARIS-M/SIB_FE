import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    // HTTP Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor,
      multi: true, // Allow multiple interceptors
    },
    // HttpClient with Interceptors and Fetch API
    provideHttpClient(
      withFetch(), // Enable Fetch API
      withInterceptors([authInterceptor]) // Apply interceptors
    ),
    // Modules
    importProvidersFrom(FontAwesomeModule, BrowserAnimationsModule, NgxSpinnerModule.forRoot()),
    // Zone Change Detection
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Toastr Configuration
    provideToastr({
      timeOut: 4000, // Duration in milliseconds
      positionClass: 'toast-top-right', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
      progressBar: true, // Show progress bar
      closeButton: true, // Show close button
      enableHtml: true, // Allow HTML in toast messages
    }),
    // Router
    provideRouter(routes),
    // Client Hydration (SSR)
    provideClientHydration(withEventReplay()),
    // Animations
    provideAnimations(),
  ],
};
