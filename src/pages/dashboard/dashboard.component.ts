import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigurationService } from '../../services/configuration.service';

@Injectable()
@Component({
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent {

    constructor(private router: Router) { }

    // lineChart
    public lineChartData: Array<any> = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartType: string = 'line';
    
    /*
    ** On Init function, which makes sure that all required prerequisites are done
    */
    ngOnInit() {
        // If not logged in, let's move to
        if (localStorage.getItem('logged_in') != true.toString()) {
            this.router.navigate(['/']);
        }
    }

}