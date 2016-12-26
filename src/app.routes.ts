import { Routes, RouterModule } from '@angular/router';

/* Page Imports */
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});