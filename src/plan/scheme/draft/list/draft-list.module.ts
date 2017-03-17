import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanSharedModule} from '../../../shared/module';
import {SchemeDraftListComponent} from './draft-list.component';

const ROUTER_CONFIG = [
    {path: '', component: SchemeDraftListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PlanSharedModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        SchemeDraftListComponent,
    ],
    exports: [SchemeDraftListComponent],
})
export class SchemeDraftListModule {}
