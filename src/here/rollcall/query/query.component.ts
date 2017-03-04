import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AlwaysRouteReuseStrategy} from './reuse';

@Component({
    selector: 'rollcall-query-container',
    template: '<router-outlet></router-outlet>',
})
export class RollcallQueryComponent {
    constructor(router: Router) {
        router.routeReuseStrategy = new AlwaysRouteReuseStrategy();
    }
}
