import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ConfigurationService } from '../../services/configuration.service';

@Injectable()
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['../../css/ng2-cms.css']
})

export class LoginComponent {

    constructor(private http: Http, private config: ConfigurationService, private router: Router) { }

    email: string;
    password: string;
    regEmail: string;

    /*
    ** Login function for sending request to backend for validation
    */
    onLogin(): any {
        // Let's create headers
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        // Send request to back-end
        this.http.post(this.config.getBaseUrl() + '/api/login', JSON.stringify({ email: this.email, password: this.password }), options)
            .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log('Login successful')
            );
    }

    /*
    ** Redirect to registration page with filled data
    */
    onRegister(): any {
        this.router.navigate(['/registration'], { queryParams: { email: this.regEmail } } );
    }
}
