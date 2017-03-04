import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {AttendanceItemComponent} from './item.component';
import {AttendanceItemMainService} from './main.service';

@NgModule({
    bootstrap: [AttendanceItemComponent],
    declarations: [
        AttendanceItemComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        RestModule.for('/api/here/students/${userId}/attendances'),
    ],
    providers: [
        AttendanceItemMainService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
