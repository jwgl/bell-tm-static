import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanCommonModule} from '../../../common/module';
import {SchemeDepartmentListComponent} from './department-list.component';

const ROUTER_CONFIG = [
    {path: '', component: SchemeDepartmentListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PlanCommonModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        SchemeDepartmentListComponent,
    ],
    exports: [SchemeDepartmentListComponent],
})
export class SchemeDepartmentListModule {}
