import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {AttendanceListComponent} from './list.component';
import {AttendanceListMainComponent} from './main.component';
import {AttendanceListMainRoutingModule} from './main.routing';
import {AttendanceListMainService} from './main.service';

@NgModule({
    bootstrap: [AttendanceListMainComponent],
    declarations: [
        AttendanceListMainComponent,
        AttendanceListComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        RestModule.for('/api/here/attendances'),
        AttendanceListMainRoutingModule,
    ],
    providers: [
        AttendanceListMainService,
        {provide: 'ADMIN_CLASS_ATTENDANCE_API', useValue: '/api/here/adminClasses/${id}/attendances'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
