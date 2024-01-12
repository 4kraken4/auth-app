import { bootstrapApplication } from '@angular/platform-browser';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .then((ref) => {
    if ((window as any)['ngRef']) {
      (window as any)['ngRef'].destroy();
    }
    (window as any)['ngRef'] = ref;
  })
  .catch((err) => console.error(err));
