import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {RoolcallFormEditorModule} from './editor/form-editor.module';
import {RollcallFormRoutingModule} from './form-routing.module';
import {RollcallFormComponent} from './form.component';
import {RollcallFormService} from './form.service';
import {RollcallScheduleModule} from './schedule/schedule.module';

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
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
