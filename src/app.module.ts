import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Other Service imports */
import { routing } from './app.routes';

/* Component imports */
import { AppComponent } from './components/app/app.component';
import { NavigationComponent } from './components/navigation/navigation.component';

/* Page Imports */
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/editUser/editUser.component';
import { AddUserComponent } from './pages/newUser/newUser.component';

/* Service Imports */
import { ConfigurationService } from './services/configuration.service'; 
import { ValidatorService } from './services/validator.service';

/* Pipe imports */
import { ErrorPipe } from './pipes/error.pipe';

@NgModule({
    providers: [
        ConfigurationService,
        ValidatorService
    ],
    imports: [
        BrowserModule,
        routing,
        NgbModule.forRoot(),
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        NavigationComponent,
        LoginComponent,
        RegistrationComponent,
        DashboardComponent,
        UsersComponent,
        EditUserComponent,
        AddUserComponent,
        ErrorPipe
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
