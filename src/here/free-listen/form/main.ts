import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {FreeFormComponent} from './form.component';
import {FreeFormService} from './form.service';
import {FreeFormRoutingModule} from './form-routing.module';
import {FreeFormListModule} from './list/form-list.module';
import {FreeFormItemModule} from './item/form-item.module';
import {LeaveFormEditorModule} from './editor/form-editor.module';

@NgModule({
    bootstrap: [FreeFormComponent],
    declarations: [
        FreeFormComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/here/students/${userId}/freeListens'),
        FreeFormRoutingModule,
        LeaveFormEditorModule,
        FreeFormItemModule,
        FreeFormListModule,
    ],
    providers: [
        FreeFormService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
