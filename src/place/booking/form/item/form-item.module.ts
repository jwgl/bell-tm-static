import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogsModule} from 'core/common-dialogs';
import {WorkflowModule} from 'core/workflow';

import {BookingCommonModule} from '../../common/booking-common.module';
import {BookingFormItemComponent} from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        WorkflowModule,
        BookingCommonModule,
    ],
    declarations: [
        BookingFormItemComponent,
    ],
    exports: [
        BookingFormItemComponent,
    ],
})
export class BookingFormItemModule {}
