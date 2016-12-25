import { Component, ViewChild, Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfigurationService } from '../../services/configuration.service';
import { ValidatorService } from '../../services/validator.service';

@Injectable()
@Component({
    templateUrl: './registration.component.html',
    styleUrls: ['../../css/ng2-cms.css']
})

export class RegistrationComponent {
    @ViewChild('content') content: string;

    constructor(private route: ActivatedRoute, private router: Router, private http: Http, private config: ConfigurationService, private validator: ValidatorService, private modalService: NgbModal) { }

    sub: any;
    email: string;
    password: string;
    passwordRepeat: string;
    name: string;
    surname: string;
    age: number;
    gender: string;
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

        // Validate fields
        this.validateFields();

        // Send request to back-end
        if (this.errorMessages.length == 0) {
            this.http.post(this.config.getBaseUrl() + '/api/auth/register', JSON.stringify({ email: this.email, password: this.password, name: this.name, surname: this.surname, age: this.age, gender: this.gender }), options)
                .subscribe(
                data => this.validateReturnData(data)
                );
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

        // Validate password repeat
        if (!this.validator.isEqual(this.password, this.passwordRepeat)) {
            this.errorMessages.push({ param: 'passwordRepeat', msg: 'Password (repeat) must be equal to password!' });
        }

        // Validate name
        if (!this.validator.isAlpha(this.name)) {
            this.errorMessages.push({ param: 'name', msg: 'Name field must contain only letters!' });
        }
        if (!this.validator.minLength(this.name, 1)) {
            this.errorMessages.push({ param: 'name', msg: 'Name must be at least 1 character long!' });
        }
        if (!this.validator.maxLength(this.name, 30)) {
            this.errorMessages.push({ param: 'name', msg: 'Name must be less than 30 characters long!' });
        }

        // Validate surname
        if (!this.validator.isAlpha(this.surname)) {
            this.errorMessages.push({ param: 'surname', msg: 'Surname field must contain only letters!' });
        }
        if (!this.validator.minLength(this.surname, 1)) {
            this.errorMessages.push({ param: 'surname', msg: 'Surname must be at least 1 character long!' });
        }
        if (!this.validator.maxLength(this.surname, 30)) {
            this.errorMessages.push({ param: 'surname', msg: 'Surname must be less than 30 characters long!' });
        }

        // Validate age
        if (!this.validator.intInRange(this.age, 0, 120)) {
            this.errorMessages.push({ param: 'age', msg: 'Age must be a number between 0 and 120!' })
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
    ** Validate returned data form the back-end
    */
    validateReturnData(data: any) {
        var returnedData = data.json();
        // Check if returned data has back-end validation errors, if so - then show error messages
        if (returnedData.status == 'errors') {
            for (let currErr = 0; currErr < returnedData.errors.length; currErr++) {
                this.errorMessages.push(returnedData.errors[currErr]);
            }
        } else {
            // No errors - let's show modal popup and navigate to login page
            this.modalService.open(this.content).result.then(() => {
                this.router.navigate(['/']);
            }, () => {
                this.router.navigate(['/']);
            });
        }
    }

    /*
    ** On destroy function, which makes sure everything that is not necessary is deleted
    */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}