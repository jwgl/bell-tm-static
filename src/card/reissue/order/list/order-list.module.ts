import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueOrderListComponent} from './order-list.component';
import {RouterModule} from '@angular/router';

const ROUTER_CONFIG = [
    {path: '', component: ReissueOrderListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        ReissueOrderListComponent,
    ],
    exports: [ReissueOrderListComponent],
})
export class ReissueOrderListModule {}
