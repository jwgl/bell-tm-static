import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {RollcallStudentComponent} from './student.component';
import {RollcallStudentService} from './student.service';

@NgModule({
    bootstrap: [RollcallStudentComponent],
    declarations: [
        RollcallStudentComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        RestModule.for('/api/here/students/${userId}/rollcalls'),
    ],
    providers: [
        RollcallStudentService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
