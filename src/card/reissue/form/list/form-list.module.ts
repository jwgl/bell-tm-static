import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from '../../../../core/common-directives';
import {ReissueFormListComponent} from './form-list.component';
import {RouterModule} from '@angular/router';

const ROUTER_CONFIG = [
    {path: '', component: ReissueFormListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        ReissueFormListComponent,
    ],
    exports: [ReissueFormListComponent],
})
export class ReissueFormListModule {}
