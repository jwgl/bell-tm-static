import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {ReissueSharedModule} from '../shared/reissue-shared.module';
import {ReissueItemComponent} from './item.component';
import {ReissueItemService} from './item.service';

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
