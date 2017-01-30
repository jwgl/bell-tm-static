import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueFormListComponent} from './form-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
    ],
    declarations: [
        ReissueFormListComponent,
    ],
    exports: [
        ReissueFormListComponent,
    ],
})
export class ReissueFormListModule {}
