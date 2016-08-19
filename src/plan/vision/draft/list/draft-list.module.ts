import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditStatusComponent} from '../../../../core/components';
import {PlanCommonModule} from '../../../common/module';
import {VisionDraftListComponent} from './draft-list.component';
import {RouterModule, RouterConfig} from '@angular/router';

const ROUTER_CONFIG: RouterConfig = [
    {path: '', component: VisionDraftListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        AuditStatusComponent,
        VisionDraftListComponent,
    ],
    exports: [VisionDraftListComponent],
})
export class DraftListModule {}
