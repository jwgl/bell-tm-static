import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {BookingSharedModule} from '../shared/booking-shared.module';
import {BookingApprovalComponent} from './approval.component';
import {BookingApprovalService} from './approval.service';
import {BookingApprovalRoutingModule} from './approval.routing';
import {BookingApprovalListComponent} from './list/approval-list.component';
import {BookingApprovalItemComponent} from './item/approval-item.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/place/approvers/${userId}/bookings'),
        BookingApprovalRoutingModule,
        BookingSharedModule,
    ],
    declarations: [
        BookingApprovalComponent,
        BookingApprovalListComponent,
        BookingApprovalItemComponent,
    ],
    providers: [
        BookingApprovalService,
    ],
    bootstrap: [BookingApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
