import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanSharedModule} from '../../../shared/module';
import {SchemeAdminListComponent} from './admin-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        PlanSharedModule,
    ],
    declarations: [
        SchemeAdminListComponent,
    ],
    exports: [SchemeAdminListComponent],
})
export class SchemeAdminListModule {}
