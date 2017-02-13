import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {BookingFormEditorModule} from './editor/form-editor.module';
import {BookingFormComponent} from './form.component';
import {BookingFormRoutingModule} from './form.routing';
import {BookingFormService} from './form.service';
import {BookingFormItemModule} from './item/form-item.module';
import {BookingFormListModule} from './list/form-list.module';

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
