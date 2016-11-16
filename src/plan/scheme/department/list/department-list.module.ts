import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanCommonModule} from '../../../common/module';
import {SchemeDepartmentListComponent} from './department-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        PlanCommonModule,
    ],
    declarations: [
        SchemeDepartmentListComponent,
    ],
    exports: [SchemeDepartmentListComponent],
})
export class SchemeDepartmentListModule {}
