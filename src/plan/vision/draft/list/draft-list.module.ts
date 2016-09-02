import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanCommonModule} from '../../../common/module';
import {VisionDraftListComponent} from './draft-list.component';

const ROUTER_CONFIG = [
    {path: '', component: VisionDraftListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        RouterModule.forChild(ROUTER_CONFIG),
        CommonDirectivesModule,
    ],
    declarations: [
        VisionDraftListComponent,
    ],
    exports: [VisionDraftListComponent],
})
export class VisionDraftListModule {}
