import { Component, Injectable, ViewChild } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { ConfigurationService } from '../../services/configuration.service';

@Injectable()
@Component({
    templateUrl: './editUser.component.html'
})

export class EditUserComponent { 

    constructor(private router: Router, private http: Http, private config: ConfigurationService) { }

}