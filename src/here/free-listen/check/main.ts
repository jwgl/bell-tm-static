import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {FreeListenSharedModule} from '../shared/free-listen-shared.module';
import {FreeListenCheckComponent} from './check.component';
import {FreeListenCheckService} from './check.service';
import {FreeListenCheckRoutingModule} from './check.routing';
import {FreeListenCheckListComponent} from './list/check-list.component';
import {FreeListenCheckItemComponent} from './item/check-item.component';

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
