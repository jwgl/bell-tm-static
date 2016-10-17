import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {BookingFormComponent} from './form.component';
import {BookingFormService} from './form.service';
import {routing} from './form.routes';
import {BookingFormListModule} from './list/form-list.module';
import {BookingFormItemModule} from './item/form-item.module';
import {BookingFormEditorModule} from './editor/form-editor.module';

@NgModule({
    bootstrap: [BookingFormComponent],
    declarations: [
        BookingFormComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/place/users/${userId}/bookingForms'),
        routing,
        BookingFormEditorModule,
        BookingFormItemModule,
        BookingFormListModule,
    ],
    providers: [
        BookingFormService,
        {provide: 'DEPARTMENT_BOOKING_TYPES_API_URL', useValue: '/api/place/departments/${departmentId}/bookingTypes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
