import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {BookingReportListComponent} from './report-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
    ],
    declarations: [
        BookingReportListComponent,
    ],
    exports: [BookingReportListComponent],
})
export class BookingReportListModule {}
