import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {BookingSharedModule} from '../shared/booking-shared.module';
import {BookingItemComponent} from './item.component';
import {BookingItemService} from './item.service';

@NgModule({
    imports: [
        BrowserModule,
        RestModule.for('/api/place/bookings'),
        WorkflowModule,
        BookingSharedModule,
    ],
    declarations: [
        BookingItemComponent,
    ],
    providers: [
        BookingItemService,
    ],
    bootstrap: [BookingItemComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
