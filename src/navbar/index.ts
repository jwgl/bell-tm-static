import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {LogoComponent} from './logo.component';
import {NavbarComponent, NavitemComponent, DropdownMenu, SubmenuDirective} from './navbar.component';
import {NavbarService} from './navbar.service';

@NgModule({
    bootstrap: [NavbarComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/core/menus'),
    ],
    declarations: [
        NavbarComponent,
        NavitemComponent,
        DropdownMenu,
        SubmenuDirective,
        LogoComponent,
    ],
    providers: [
        NavbarService,
    ]
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
