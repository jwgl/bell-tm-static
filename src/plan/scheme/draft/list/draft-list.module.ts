import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from '../../../../core/common-directives';
import {PlanCommonModule} from '../../../common/module';
import {SchemeDraftListComponent} from './draft-list.component';
import {RouterModule} from '@angular/router';

const ROUTER_CONFIG = [
    {path: '', component: SchemeDraftListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PlanCommonModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        SchemeDraftListComponent,
    ],
    exports: [SchemeDraftListComponent],
})
export class SchemeDraftListModule {}
