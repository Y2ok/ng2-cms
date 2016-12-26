import { Routes, RouterModule } from '@angular/router';

/* Page Imports */
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component'; 
import { EditUserComponent } from './pages/editUser/editUser.component';
import { AddUserComponent } from './pages/newUser/newUser.component';

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
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'editUser/:id',
        component: EditUserComponent
      },
      {
        path: 'addUser',
        component: AddUserComponent
      }
    ]
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});