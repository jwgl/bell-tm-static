import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';

import {BookingFormListComponent} from './form-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
    ],
    declarations: [
        BookingFormListComponent,
    ],
    exports: [
        BookingFormListComponent,
    ],
})
export class BookingFormListModule {}
