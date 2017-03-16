import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {BookingAuthComponent} from './booking-auth.component';
import {BookingAuthDialog} from './booking-auth.dialog';
import {BookingAuthService} from './booking-auth.service';

@NgModule({
    bootstrap: [BookingAuthComponent],
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        RestModule.for('/api/place/settings/bookingAuths'),
    ],
    declarations: [
        BookingAuthComponent,
        BookingAuthDialog,
    ],
    providers: [
        BookingAuthService,
        {provide: 'DEPARTMENT_TEACHERS_API_URL', useValue: '/api/place/departments/${departmentId}/teachers'},
    ],
    entryComponents: [
        BookingAuthDialog,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
