import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {LeaveSharedModule} from '../shared/leave-shared.module';
import {LeaveItemComponent} from './item.component';
import {LeaveItemService} from './item.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/here/leaves'),
        LeaveSharedModule,
    ],
    declarations: [
        LeaveItemComponent,
    ],
    providers: [
        LeaveItemService,
    ],
    bootstrap: [LeaveItemComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
