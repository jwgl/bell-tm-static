import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {BookingReviewComponent} from './review.component';
import {BookingCommonModule} from '../common/booking-common.module';

@NgModule({
    bootstrap: [BookingReviewComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/place/bookings'),
        WorkflowModule,
        BookingCommonModule,
    ],
    declarations: [
        BookingReviewComponent,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
