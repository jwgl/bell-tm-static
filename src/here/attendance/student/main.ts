import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {AttendanceStudentMainService} from './main.service';
import {AttendanceStudentComponent} from './student.component';

@NgModule({
    bootstrap: [AttendanceStudentComponent],
    declarations: [
        AttendanceStudentComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        RestModule.for('/api/here/students/${userId}/attendances'),
    ],
    providers: [
        AttendanceStudentMainService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
