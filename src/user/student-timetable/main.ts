import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {StudentTimetableService} from './main.service';
import {StudentTimetableComponent} from './student-timetable.component';

@NgModule({
    bootstrap: [StudentTimetableComponent],
    declarations: [
        StudentTimetableComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/core/students/${userId}/schedules'),
        CommonDirectivesModule,
    ],
    providers: [
        StudentTimetableService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
