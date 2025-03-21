import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient( withFetch(), // Enable Fetch API for SSR
    withInterceptors([authInterceptor])), // Enable fetch API
    provideServerRoutesConfig(serverRoutes),
    importProvidersFrom(NoopAnimationsModule)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
