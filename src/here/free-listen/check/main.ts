import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {FreeListenSharedModule} from '../shared/free-listen-shared.module';
import {FreeListenCheckComponent} from './check.component';
import {FreeListenCheckRoutingModule} from './check.routing';
import {FreeListenCheckService} from './check.service';
import {FreeListenCheckItemComponent} from './item/check-item.component';
import {FreeListenCheckListComponent} from './list/check-list.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/here/teachers/${userId}/freeListens'),
        FreeListenCheckRoutingModule,
        FreeListenSharedModule,
    ],
    declarations: [
        FreeListenCheckComponent,
        FreeListenCheckListComponent,
        FreeListenCheckItemComponent,
    ],
    providers: [
        FreeListenCheckService,
    ],
    bootstrap: [FreeListenCheckComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
