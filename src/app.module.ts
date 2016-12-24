import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/* Other Service imports */
import { routing } from './app.routes';

/* Component imports */
import { AppComponent } from './components/app/app.component';

/* Page Imports */
import { LoginComponent } from './pages/login/login.component';



@NgModule({
    providers: [
    ],
    imports: [
        BrowserModule,
        routing,
        NgbModule.forRoot()
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
