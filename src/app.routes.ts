import { Routes, RouterModule } from '@angular/router';

/* Page Imports */
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});