import { bootstrapApplication } from '@angular/platform-browser';
// Include Bootstrap's JS bundle so Navbar toggler and collapse work
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
