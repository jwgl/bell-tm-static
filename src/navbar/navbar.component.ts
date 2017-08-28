import {Component} from '@angular/core';

import {NavbarService} from './main.service';

@Component({
    selector: 'header',
    styleUrls: ['navbar.component.scss'],
    templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
    menus: {main: any[], user: any[]};

    constructor(private service: NavbarService) {
        if (sessionStorage && sessionStorage.getItem('menu')) {
            this.menus = JSON.parse(sessionStorage.getItem('menu'));
        } else {
            this.service.loadList(['main', 'user']).subscribe(menus => {
                this.menus = menus;
                sessionStorage.setItem('menu', JSON.stringify(menus));
            });
        }
    }
}
