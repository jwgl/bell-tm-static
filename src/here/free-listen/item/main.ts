import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {FreeListenSharedModule} from '../shared/free-listen-shared.module';
import {FreeListenItemComponent} from './item.component';
import {FreeListenItemService} from './item.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/here/freeListens'),
        FreeListenSharedModule,
    ],
    declarations: [
        FreeListenItemComponent,
    ],
    providers: [
        FreeListenItemService,
    ],
    bootstrap: [FreeListenItemComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
