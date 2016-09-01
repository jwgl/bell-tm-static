import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditStatusComponent} from '../../../../core/components';
import {ReissueFormListComponent} from './form-list.component';
import {RouterModule, RouterConfig} from '@angular/router';

const ROUTER_CONFIG: RouterConfig = [
    {path: '', component: ReissueFormListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        AuditStatusComponent,
        ReissueFormListComponent,
    ],
    exports: [ReissueFormListComponent],
})
export class ReissueFormListModule {}
