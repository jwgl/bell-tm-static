import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

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
