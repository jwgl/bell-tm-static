import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {AdminClassListComponent} from './list.component';
import {AdminClassListMainComponent} from './main.component';
import {AdminClassListMainRoutingModule} from './main.routing';
import {AdminClassListMainService} from './main.service';

@NgModule({
    bootstrap: [AdminClassListMainComponent],
    declarations: [
        AdminClassListMainComponent,
        AdminClassListComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/here/attendances'),
        CommonDirectivesModule,
        AdminClassListMainRoutingModule,
    ],
    providers: [
        AdminClassListMainService,
        {provide: 'ADMIN_CLASS_ATTENDANCE_API', useValue: '/api/here/adminClasses/${id}/attendances'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
