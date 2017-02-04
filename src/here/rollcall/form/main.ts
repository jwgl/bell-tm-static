import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {RollcallFormComponent} from './form.component';
import {RollcallFormRoutingModule} from './form-routing.module';
import {RollcallScheduleModule} from './schedule/schedule.module';
import {RoolcallFormEditorModule} from './editor/form-editor.module';
import {RollcallFormService} from './form.service';

@NgModule({
    bootstrap: [RollcallFormComponent],
    declarations: [
        RollcallFormComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/here/teachers/${userId}/rollcalls'),
        RollcallFormRoutingModule,
        RollcallScheduleModule,
        RoolcallFormEditorModule,
    ],
    providers: [
        RollcallFormService,
        {provide: 'PUBLIC_LEAVE_WEB_URL', useValue: '/web/here/leaves'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
