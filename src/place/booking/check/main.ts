import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {BookingSharedModule} from '../shared/booking-shared.module';
import {BookingCheckComponent} from './check.component';
import {BookingCheckService} from './check.service';
import {BookingCheckRoutingModule} from './check.routing';
import {BookingCheckListComponent} from './list/check-list.component';
import {BookingCheckItemComponent} from './item/check-item.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/place/checkers/${userId}/bookings'),
        BookingCheckRoutingModule,
        BookingSharedModule,
    ],
    declarations: [
        BookingCheckComponent,
        BookingCheckListComponent,
        BookingCheckItemComponent,
    ],
    providers: [
        BookingCheckService,
    ],
    bootstrap: [BookingCheckComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
