import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {LeaveFormListComponent} from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
    ],
    declarations: [
        LeaveFormListComponent,
    ],
    exports: [
        LeaveFormListComponent,
    ],
})
export class LeaveFormListModule {}
