import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueOrderListComponent} from './order-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
    ],
    declarations: [
        ReissueOrderListComponent,
    ],
    exports: [ReissueOrderListComponent],
})
export class ReissueOrderListModule {}
