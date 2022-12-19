import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { appRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      appRoutes,
      // withDebugTracing(),
      withPreloading(PreloadAllModules)
    ),
  ],
}).catch((err) => console.error(err));
