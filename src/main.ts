import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// BOOTSTRAP THE MAIN APP MODULE
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));