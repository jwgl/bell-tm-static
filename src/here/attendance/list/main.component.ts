import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AlwaysRouteReuseStrategy} from './main.reuse';

@Component({
    selector: 'attendance-list-container',
    template: '<router-outlet></router-outlet>',
})
export class AttendanceListMainComponent {
    constructor(router: Router) {
        router.routeReuseStrategy = new AlwaysRouteReuseStrategy();
    }
}
