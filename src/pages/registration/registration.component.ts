import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigurationService } from '../../services/configuration.service';

@Injectable()
@Component({
    templateUrl: './registration.component.html',
    styleUrls: ['../../css/ng2-cms.css']
})

export class RegistrationComponent {
    constructor(private route: ActivatedRoute, private http: Http, private config: ConfigurationService) { }

    sub: any;
    email: string;
    password: string;
    passwordRepeat: string;
    name: string;
    surname: string;
    age: number;
    gender: string;
    error: boolean;
    emailConst: string = 'email';
    errorMessages: any[] = [];

    /*
    ** On Init function, which makes sure that all required prerequisites are done
    */
    ngOnInit() {
        // Pass data to registration page
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.email = params['email'];
            });
    }

    /*
    ** Send register request to back-end
    */
    onRegister(): any {
        // Let's clear old error messages
        this.errorMessages = [];

        // Let's create headers
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });

        if(this.password != this.passwordRepeat) {
            this.error = true;
        }

        // Send request to back-end
        if(!this.error) {
            this.http.post(this.config.getBaseUrl() + '/api/auth/register', JSON.stringify({ email: this.email, password: this.password, name: this.name, surname: this.surname, age: this.age, gender: this.gender }), options)
                .subscribe(
                    data => this.validateReturnData(data)
                );        
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

    validateReturnData(data: any): any {
        var returnedData = data.json();
        if(returnedData.status == 'errors') {
            for (let currErr = 0; currErr < returnedData.errors.length; currErr++) {
                this.errorMessages.push(returnedData.errors[currErr]);
            }
        } else {

        }
    }

    /*
    ** On destroy function, which makes sure everything that is not necessary is deleted
    */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}