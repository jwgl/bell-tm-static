import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanSharedModule} from '../../../shared/module';
import {SchemeDepartmentListComponent} from './department-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        PlanSharedModule,
    ],
    declarations: [
        SchemeDepartmentListComponent,
    ],
    exports: [SchemeDepartmentListComponent],
})
export class SchemeDepartmentListModule {}
