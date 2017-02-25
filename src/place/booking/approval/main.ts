import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {BookingSharedModule} from '../shared/booking-shared.module';
import {BookingApprovalComponent} from './approval.component';
import {BookingApprovalRoutingModule} from './approval.routing';

import {BookingApprovalItemComponent} from './approval-item.component';
import {BookingApprovalListComponent} from './approval-list.component';

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
    bootstrap: [BookingApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
