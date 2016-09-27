import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {ReissueFormComponent} from './form.component';
import {ReissueFormService} from './form.service';
import {routing} from './form.routes';
import {ReissueFormListModule} from './list/form-list.module';
import {ReissueFormItemModule} from './item/form-item.module';
import {ReissueFormEditorModule} from './editor/form-editor.module';

@NgModule({
    bootstrap: [ReissueFormComponent],
    declarations: [
        ReissueFormComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/card/users/${userId}/cardReissues'),
        routing,
        ReissueFormEditorModule,
        ReissueFormItemModule,
        ReissueFormListModule,
    ],
    providers: [
        ReissueFormService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
