import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {ReissueFormComponent} from './form.component';
import {ReissueFormService} from './form.service';
import {ReissueFormRoutingModule} from './form.routing';
import {ReissueFormListModule} from './list/form-list.module';
import {ReissueFormItemModule} from './item/form-item.module';
import {ReissueFormEditorModule} from './editor/form-editor.module';

@NgModule({
    imports: [
        BrowserModule,
        RestModule.for('/api/card/students/${userId}/reissues'),
        ReissueFormRoutingModule,
        ReissueFormEditorModule,
        ReissueFormItemModule,
        ReissueFormListModule,
    ],
    declarations: [
        ReissueFormComponent,
    ],
    providers: [
        ReissueFormService,
    ],
    bootstrap: [ReissueFormComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
