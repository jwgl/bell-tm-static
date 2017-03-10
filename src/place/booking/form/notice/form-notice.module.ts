import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {BookingFormNoticeComponent} from './form-notice.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
    ],
    declarations: [
        BookingFormNoticeComponent,
    ],
    exports: [
        BookingFormNoticeComponent,
    ],
})
export class BookingFormNoticeModule {}
