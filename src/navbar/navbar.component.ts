import {Component, Directive, ElementRef, Input, ViewChild} from '@angular/core';

import {NavbarService} from './navbar.service';

@Component({
    selector: '.dropdown-menu',
    template: `
    <ng-container *ngFor="let menu of menus">
        <div *ngIf="menu.items; else menuItem" class="dropdown dropdown-submenu" [class.show]="show">
            <a href="#" class="dropdown-item" (click)="show=!show">{{menu.label}}</a>
            <div class="dropdown-menu" [menus]="menu.items"></div>
        </div>
        <ng-template #menuItem>
            <a *ngIf="menu.label != '---'; else divider" class="dropdown-item" href="{{menu.url}}">{{menu.label}}</a>
        </ng-template>
    </ng-container>
    <ng-template #divider>
        <div class="dropdown-divider"></div>
    </ng-template>
    `,
})
export class DropdownMenu {
    @Input() menus: any[];
    show: false;
}

/* tslint:disable:max-classes-per-file */
@Component({
    selector: '.nav-item[menu]',
    host: {
        '[class.dropdown]': 'menu.items',
    },
    template: `
    <ng-container *ngIf="menu.items; else naviItem">
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" data-submenu>{{menu.label}}</a>
        <div class="dropdown-menu" [menus]="menu.items"></div>
    </ng-container>
    <ng-template #naviItem>
        <a class="nav-link" href="{{menu.url}}">{{menu.label}}</a>
    </ng-template>
    `,
})
export class NavitemComponent {
    @Input() menu: any;
}

@Component({
    selector: 'header',
    template: `
    <nav class="container">
        <div class="d-flex justify-content-between hidden-lg-up">
            <a class="navbar-brand hidden-sm-up" href="/">TM</a>
            <button class="navbar-toggler collapsed" type="button"
                    data-toggle="collapse" data-target="#bd-main-nav">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <div class="navbar-collapse collapse" id="bd-main-nav">
            <div class="navbar-brand logo hidden-xs-down"></div>
            <ul class="nav navbar-nav mr-auto" *ngIf="menus">
                <li class="nav-item" [menu]="menu" *ngFor="let menu of menus.main"></li>
            </ul>
            <ul class="nav navbar-nav" *ngIf="menus">
                <li class="nav-item" [menu]="menu" *ngFor="let menu of menus.user"></li>
                <li class="nav-item">
                    <form #logoutForm action="/logout" method="post"></form>
                    <a class="nav-link" href="#" (click)="logout($event)">退出</a>
                </li>
            </ul>
        </div>
    </nav>
    `,
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

@Directive({
    selector: '[data-submenu]',
})
export class SubmenuDirective {
    constructor(elementRef: ElementRef) {
        setTimeout(() => ($(elementRef.nativeElement) as any).submenupicker(), 1);
    }
}
