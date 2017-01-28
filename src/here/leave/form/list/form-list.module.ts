import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {LeaveSharedModule} from '../../shared/leave-shared.module';
import {LeaveFormListComponent} from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
        LeaveSharedModule,
    ],
    declarations: [
        LeaveFormListComponent,
    ],
    exports: [
        LeaveFormListComponent,
    ],
})
export class LeaveFormListModule {}
