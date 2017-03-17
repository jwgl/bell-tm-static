import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanSharedModule} from '../../../shared/module';
import {VisionDraftListComponent} from './draft-list.component';

const ROUTER_CONFIG = [
    {path: '', component: VisionDraftListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
        RouterModule.forChild(ROUTER_CONFIG),
        CommonDirectivesModule,
    ],
    declarations: [
        VisionDraftListComponent,
    ],
    exports: [VisionDraftListComponent],
})
export class VisionDraftListModule {}
