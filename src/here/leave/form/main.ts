import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {LeaveFormEditorModule} from './editor/form-editor.module';
import {LeaveFormRoutingModule} from './form-routing.module';
import {LeaveFormComponent} from './form.component';
import {LeaveFormService} from './form.service';
import {LeaveFormItemModule} from './item/form-item.module';
import {LeaveFormListModule} from './list/form-list.module';

@NgModule({
    bootstrap: [LeaveFormComponent],
    declarations: [
        LeaveFormComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/here/students/${userId}/leaves'),
        LeaveFormRoutingModule,
        LeaveFormEditorModule,
        LeaveFormItemModule,
        LeaveFormListModule,
    ],
    providers: [
        LeaveFormService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
