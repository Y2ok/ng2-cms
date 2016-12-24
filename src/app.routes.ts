import { Routes, RouterModule } from '@angular/router';

/* Page Imports */
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

export const routing = RouterModule.forRoot(routes);