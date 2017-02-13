import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {BookingSharedModule} from '../shared/booking-shared.module';
import {BookingCheckComponent} from './check.component';
import {BookingCheckRoutingModule} from './check.routing';
import {BookingCheckService} from './check.service';
import {BookingCheckItemComponent} from './item/check-item.component';
import {BookingCheckListComponent} from './list/check-list.component';

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
