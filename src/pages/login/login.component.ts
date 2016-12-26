import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ConfigurationService } from '../../services/configuration.service';
import { ValidatorService } from '../../services/validator.service';

@Injectable()
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['../../css/ng2-cms.css']
})

export class LoginComponent {

    constructor(private http: Http, private config: ConfigurationService, private router: Router, private validator: ValidatorService) { }

    email: string;
    password: string;
    regEmail: string;
    errorMessages: any[] = [];

    /*
    ** Login function for sending request to backend for validation
    */
    onLogin(): any {
        // Let's clear old error messages
        this.errorMessages = [];

        // Let's create headers
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });

        // Validate fields
        this.validateFields();

        // Send request to back-end
        if (this.errorMessages.length == 0) {
            this.http.post(this.config.getBaseUrl() + '/api/auth/login', JSON.stringify({ email: this.email, password: this.password }), options)
                .subscribe(
                data => this.validateReturnData(data)
                );
        }
    }

    /*
    ** Validate returned data from back-end
    */
    validateReturnData(data: any) {
        var returnedData = data.json();

        // Check if contains errors, if so, then show error message
        if (returnedData.status == 'error') {
            // Show error message
            this.errorMessages.push(returnedData.message);
        } else {
            // No errors
        }
    }

    /*
    ** Validate front-end fields
    */
    validateFields() {
        // Validate e-mail
        if (this.validator.isEmpty(this.email)) {
            this.errorMessages.push({ param: 'email', msg: 'E-mail cannot be empty!' });
        }
        if (!this.validator.isEmail(this.email)) {
            this.errorMessages.push({ param: 'email', msg: 'Email must contain a valid e-mail!' })
        }

        // Validate password
        if (this.validator.isEmpty(this.password)) {
            this.errorMessages.push({ param: 'password', msg: 'Password cannot be empty!' });
        }
        if (!this.validator.minLength(this.password, 6)) {
            this.errorMessages.push({ param: 'password', msg: 'Password must be at least 6 characters long!' });
        }
        if (!this.validator.maxLength(this.password, 30)) {
            this.errorMessages.push({ param: 'password', msg: 'Password must be less than 30 characters long!' });
        }
    }

    /*
    ** Check if passed field has any error messages
    */
    hasError(field: string): boolean {
        for (let currErr = 0; currErr < this.errorMessages.length; currErr++) {
            if (this.errorMessages[currErr].param == field) {
                return true;
            }
        }

        return false;
    }

    /*
    ** Redirect to registration page with filled data
    */
    onRegister(): any {
        this.router.navigate(['/registration'], { queryParams: { email: this.regEmail } });
    }
}
