import { Component } from '@angular/core';


@Component({
    selector: 'navbar',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent { 
    /*
    ** Removes localstorage data and logs user out
    */
    logout() {
        localStorage.setItem('logged_in', false.toString());
    }
}
