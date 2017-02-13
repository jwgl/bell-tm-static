import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {LogoComponent} from './logo.component';
import {DropdownMenu, NavbarComponent, NavitemComponent, SubmenuDirective} from './navbar.component';
import {NavbarService} from './navbar.service';

@NgModule({
    bootstrap: [NavbarComponent],
    imports: [
        BrowserModule,
        RestModule.for('/menus'),
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
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
