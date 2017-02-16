import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {BookingReportEditorModule} from './editor/report-editor.module';
import {BookingReportItemModule} from './item/report-item.module';
import {BookingReportListModule} from './list/report-list.module';
import {BookingReportComponent} from './report.component';
import {BookingReportRoutingModule} from './report.routing';
import {BookingReportService} from './report.service';

@NgModule({
    imports: [
        BrowserModule,
        RestModule.for('/api/place/bookingReports'),
        BookingReportRoutingModule,
        BookingReportListModule,
        BookingReportItemModule,
        BookingReportEditorModule,
    ],
    declarations: [
        BookingReportComponent,
    ],
    providers: [
        BookingReportService,
        {provide: 'BOOKINGS_WEB_URL', useValue: '/web/place/bookings'},
        {provide: 'BOOKINGS_API_URL', useValue: '/api/place/bookings'},
    ],
    bootstrap: [BookingReportComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
