import { Component, Injectable, ViewChild } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { ConfigurationService } from '../../services/configuration.service';

@Injectable()
@Component({
    templateUrl: './users.component.html'
})

export class UsersComponent {

    constructor(private router: Router, private http: Http, private config: ConfigurationService) { }

    users: any;

    /*
    ** On Init function, which makes sure that all required prerequisites are done
    */
    ngOnInit() {
        // If not logged in, let's move to
        if (localStorage.getItem('logged_in') != true.toString()) {
            this.router.navigate(['/']);
        }

        // Retrieve users
        this.retrieveUsers();
    }

    /*
    ** Retrieves users from database
    */
    retrieveUsers() {
        this.http.get(this.config.getBaseUrl() + '/api/users/getUsers')
            .subscribe(
            data => this.setUsers(data)
            );
    }

    /*
    ** Set retrieved users to parameter for displaying in UI
    */
    setUsers(data: any) {
        let returnedData = data.json();

        this.users = returnedData.users;
    }

    /*
    ** Delete a user with specific user id
    */
    deleteUser(userId: number) {
        this.http.delete(this.config.getBaseUrl() + '/api/users/deleteUser/' + userId)
            .subscribe(
            data => this.updateUserTable(data, userId)
            );
    }

    /*
    ** Update user table after delete
    */
    updateUserTable(data: any, userId: number) {
        if (data.json().status == 'success') {
            let userIndex = this.users.indexOf(userId, 0);

            if (userIndex > -1) {
                this.users.splice(userIndex, 1);
            }
        }
    }

}