import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {LogoComponent} from './logo.component';
import {NavbarService} from './main.service';
import {NavbarComponent} from './navbar.component';
import {NavitemComponent} from './navitem.component';
import {NavmenuComponent} from './navmenu.component';

@NgModule({
    bootstrap: [NavbarComponent],
    imports: [
        BrowserModule,
        RestModule.for('/menus'),
    ],
    declarations: [
        LogoComponent,
        NavbarComponent,
        NavitemComponent,
        NavmenuComponent,
    ],
    providers: [
        NavbarService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
