import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from '../../../core/http';
import {ReissueFormComponent} from './form.component';
import {ReissueFormService} from './form.service';
import {ReissueFormListModule} from './list/form-list.module';
import {ReissueFormItemModule} from './item/form-item.module';
import {ReissueFormEditorModule} from './editor/form-editor.module';
import {routing} from './form.routes';

@NgModule({
    bootstrap: [ReissueFormComponent],
    declarations: [
        ReissueFormComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/users/${userId}/cardReissues'),
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
