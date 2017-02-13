import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {LeaveFormEditorModule} from './editor/form-editor.module';
import {FreeListenFormRoutingModule} from './form-routing.module';
import {FreeListenFormComponent} from './form.component';
import {FreeListenFormService} from './form.service';
import {FreeListenFormItemModule} from './item/form-item.module';
import {FreeListenFormListModule} from './list/form-list.module';

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
