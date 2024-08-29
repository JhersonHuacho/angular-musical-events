import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor, loggerInterceptor } from './app.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { SimpleNotificationsModule } from 'angular2-notifications';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([loggerInterceptor, jwtInterceptor])
    ),
    importProvidersFrom(SimpleNotificationsModule.forRoot()),
    provideCharts(withDefaultRegisterables())
  ]
};
