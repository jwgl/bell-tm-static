import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {SchemeAdminItemModule} from './item/admin-item.module';
import {SchemeAdminListModule} from './list/admin-list.module';
import {SchemeAdminComponent} from './main.component';
import {SchemeAdminRoutingModule} from './main.routing';
import {SchemeAdminService} from './main.service';

@NgModule({
    bootstrap: [SchemeAdminComponent],
    declarations: [
        SchemeAdminComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/admin/schemes'),
        SchemeAdminRoutingModule,
        SchemeAdminListModule,
        SchemeAdminItemModule,
    ],
    providers: [
        SchemeAdminService,
        {provide: 'DEPARTMENT_API_URL', useValue: '/api/plan/departments'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
