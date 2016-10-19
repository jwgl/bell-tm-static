import {Component, Directive, Input, ViewChild, ElementRef} from '@angular/core';

import {NavbarService} from './navbar.service';

@Component({
    selector: '.dropdown-menu',
    template: `
    <template ngFor let-menu [ngForOf]="menus">
        <template [ngIf]="!menu.items">
            <a *ngIf="menu.label != '---'" class="dropdown-item" href="{{menu.url}}">{{menu.label}}</a>
            <div *ngIf="menu.label == '---'" class="dropdown-divider"></div>
        </template>
        <template [ngIf]="menu.items">
            <div class="dropdown dropdown-submenu">
                <a href="#" class="dropdown-item" data-toggle="dropdown" data-submenu>
                    {{menu.label}}
                </a>
                <div class="dropdown-menu" [menus]="menu.items"></div>
            </div>
        </template>
    </template>
    `,
})
export class DropdownMenu {
    @Input() menus: any[];
}

@Component({
    selector: '.nav-item[menu]',
    host: {
        '[class.dropdown]': 'menu.items',
    },
    template: `
    <template [ngIf]="!menu.items">
        <a class="nav-link" href="{{menu.url}}">{{menu.label}}</a>
    </template>
    <template [ngIf]="menu.items">
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" data-submenu>{{menu.label}}</a>
        <div class="dropdown-menu" [menus]="menu.items"></div>
    </template>
    `,
})
export class NavitemComponent {
    @Input() menu: any;
}

@Component({
    selector: 'header',
    template: `
    <div class="container">
        <nav>
            <div class="clearfix">
                <button class="navbar-toggler float-xs-right hidden-sm-up" type="button"
                        data-toggle="collapse" data-target="#bd-main-nav"></button>
                <a class="navbar-brand hidden-sm-up" href="/">TM</a>
            </div>
            <div class="collapse navbar-toggleable-xs" id="bd-main-nav">
                <div class="navbar-brand logo hidden-xs-down"></div>
                <ul class="nav navbar-nav" *ngIf="menus">
                    <li class="nav-item" [menu]="menu" *ngFor="let menu of menus.main"></li>
                </ul>
                <ul class="nav navbar-nav float-sm-right" *ngIf="menus">
                    <li class="nav-item" [menu]="menu" *ngFor="let menu of menus.user"></li>
                    <li class="nav-item">
                        <form #logoutForm action="/logout" method="post"></form>
                        <a class="nav-link" href="#" (click)="logout($event)">退出</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
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
        setTimeout(function() {
            (<any>$(elementRef.nativeElement)).submenupicker();
        }, 1);
    }
}
