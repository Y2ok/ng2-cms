import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Other Service imports */
import { routing } from './app.routes';

/* Component imports */
import { AppComponent } from './components/app/app.component';

/* Page Imports */
import { LoginComponent } from './pages/login/login.component';

/* Service Imports */
import { ConfigurationService } from './services/configuration.service'; 

@NgModule({
    providers: [
        ConfigurationService
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
        LoginComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
