import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {LeaveFormComponent} from './form.component';
import {LeaveFormService} from './form.service';
import {LeaveFormRoutingModule} from './form-routing.module';
import {LeaveFormListModule} from './list/form-list.module';
import {LeaveFormItemModule} from './item/form-item.module';
import {LeaveFormEditorModule} from './editor/form-editor.module';

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
