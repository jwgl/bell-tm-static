import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {BookingFormComponent} from './form.component';
import {BookingFormService} from './form.service';
import {BookingFormRoutingModule} from './form.routing';
import {BookingFormListModule} from './list/form-list.module';
import {BookingFormItemModule} from './item/form-item.module';
import {BookingFormEditorModule} from './editor/form-editor.module';

@NgModule({
    imports: [
        BrowserModule,
        RestModule.for('/api/place/users/${userId}/bookings'),
        BookingFormRoutingModule,
        BookingFormEditorModule,
        BookingFormItemModule,
        BookingFormListModule,
    ],
    declarations: [
        BookingFormComponent,
    ],
    providers: [
        BookingFormService,
        {provide: 'DEPARTMENT_BOOKING_TYPES_API_URL', useValue: '/api/place/departments/${departmentId}/bookingTypes'},
    ],
    bootstrap: [BookingFormComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
