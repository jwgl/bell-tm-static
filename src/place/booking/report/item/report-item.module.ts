import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

import {BookingSharedModule} from '../../shared/booking-shared.module';
import {BookingReportItemComponent} from './report-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        BookingSharedModule,
        RouterModule,
    ],
    declarations: [
        BookingReportItemComponent,
    ],
    exports: [
        BookingReportItemComponent,
    ],
})
export class BookingReportItemModule {}
