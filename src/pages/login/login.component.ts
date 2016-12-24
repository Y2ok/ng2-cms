import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationService } from '../../services/configuration.service';

@Injectable()
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['../../css/ng2-cms.css']
})

export class LoginComponent {

    constructor(private http: Http, private config: ConfigurationService) { }

    /*
    ** Login function for sending request to backend for validation
    */
    onLogin(): any {
        // Let's create headers
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        // Send request to back-end
        this.http.get(this.config.getBaseUrl() + '/login', { headers: headers })
            .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log('Login successful')
            );

    }
}
