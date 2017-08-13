import {Component, Directive, ElementRef, Input, ViewChild} from '@angular/core';

import {NavbarService} from './main.service';

@Component({
    selector: 'header',
    templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
    menus: {main: any[], user: any[]};

    @ViewChild('logoutForm') logoutForm: ElementRef;

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

    logout(event: Event) {
        event.preventDefault();
        this.service.logout().subscribe(() => {
            sessionStorage.removeItem('menu');
            this.logoutForm.nativeElement.submit();
        });
    }
}
