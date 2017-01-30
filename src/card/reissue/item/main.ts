import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {ReissueItemComponent} from './item.component';
import {ReissueItemService} from './item.service';
import {ReissueSharedModule} from '../shared/reissue-shared.module';

@NgModule({
    imports: [
        BrowserModule,
        RestModule.for('/api/card/reissues'),
        WorkflowModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueItemComponent,
    ],
    providers: [
        ReissueItemService,
    ],
    bootstrap: [ReissueItemComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
