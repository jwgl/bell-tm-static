import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {FreeListenFormComponent} from './form.component';
import {FreeListenFormService} from './form.service';
import {FreeListenFormRoutingModule} from './form-routing.module';
import {FreeListenFormListModule} from './list/form-list.module';
import {FreeListenFormItemModule} from './item/form-item.module';
import {LeaveFormEditorModule} from './editor/form-editor.module';

@NgModule({
    bootstrap: [FreeListenFormComponent],
    declarations: [
        FreeListenFormComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/here/students/${userId}/freeListens'),
        FreeListenFormRoutingModule,
        LeaveFormEditorModule,
        FreeListenFormItemModule,
        FreeListenFormListModule,
    ],
    providers: [
        FreeListenFormService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
