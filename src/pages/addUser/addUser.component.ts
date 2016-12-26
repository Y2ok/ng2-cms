import { Component, Injectable, ViewChild } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { ConfigurationService } from '../../services/configuration.service';
import { ValidatorService } from '../../services/validator.service';

@Injectable()
@Component({
    templateUrl: './addUser.component.html'
})

export class AddUserComponent { 

    constructor(private router: Router, private http: Http, private config: ConfigurationService, private validator: ValidatorService) { }

    email: string;
    password: string;
    passwordRepeat: string;
    name: string;
    surname: string;
    birthday: Date;
    gender: string;
    role: string;
    errorMessages: any[] = [];

    /*
    ** On Init function, which makes sure that all required prerequisites are done
    */
    ngOnInit() {
        // If not logged in, let's move to
        if (localStorage.getItem('logged_in') != true.toString()) {
            this.router.navigate(['/']);
        }
    }

    /*
    ** Send request to back-end with all required user data for adding user
    */
    addUser() {
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
            // Create user data
            let userData = { 
                email: this.email, 
                password: this.password, 
                name: this.name, 
                surname: this.surname, 
                birthday: new Date(this.birthday), 
                creationDate: new Date(), 
                gender: this.gender 
            };

            // Send POST request and try to register user
            this.http.post(this.config.getBaseUrl() + '/api/auth/register', JSON.stringify(userData), options)
                .subscribe(
                data => console.log(data)
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

        // Validate birthday
        if (!this.validator.isDateBefore(new Date(this.birthday), new Date())) {
            this.errorMessages.push({ param: 'birthday', msg: 'Date must be in the past!' });
        }
        if (!this.validator.isDateAfter(new Date(this.birthday), new Date("01.01.1900"))) {
            this.errorMessages.push({ param: 'birthday', msg: 'Date must be entered after 1900.01.01' });
        }

        // Validate gender
        if (this.validator.isEmpty(this.gender)) {
            this.errorMessages.push({ param: 'gender', msg: 'Please select a gender!' });
        }

        // Validate role
        if (this.validator.isEmpty(this.role)) {
            this.errorMessages.push({ param: 'role', msg: 'Please select a role!' });
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
}