import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
