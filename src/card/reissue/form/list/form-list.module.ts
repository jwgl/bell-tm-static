import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueFormListComponent} from './form-list.component';

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
