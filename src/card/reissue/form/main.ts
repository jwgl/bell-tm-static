import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {ReissueFormEditorModule} from './editor/form-editor.module';
import {ReissueFormComponent} from './form.component';
import {ReissueFormRoutingModule} from './form.routing';
import {ReissueFormService} from './form.service';
import {ReissueFormItemModule} from './item/form-item.module';
import {ReissueFormListModule} from './list/form-list.module';

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
