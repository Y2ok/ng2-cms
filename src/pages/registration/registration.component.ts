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
    constructor(private route: ActivatedRoute) { }

    sub: any;
    email: string;

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
    ** On destroy function, which makes sure everything that is not necessary is deleted
    */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}