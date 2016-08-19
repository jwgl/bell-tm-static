import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditStatusComponent} from '../../../../core/components';
import {PlanCommonModule} from '../../../common/module';
import {SchemeDraftListComponent} from './draft-list.component';
import {RouterModule, RouterConfig} from '@angular/router';

const ROUTER_CONFIG: RouterConfig = [
    {path: '', component: SchemeDraftListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        AuditStatusComponent,
        SchemeDraftListComponent,
    ],
    exports: [SchemeDraftListComponent],
})
export class DraftListModule {}
