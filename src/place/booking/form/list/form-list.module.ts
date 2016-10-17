import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';

import {BookingFormListComponent} from './form-list.component';
import {RouterModule} from '@angular/router';

const ROUTER_CONFIG = [
    {path: '', component: BookingFormListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        BookingFormListComponent,
    ],
    exports: [
        BookingFormListComponent
    ],
})
export class BookingFormListModule {}