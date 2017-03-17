import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PlanSharedModule} from '../../../shared/module';
import {SchemePublicListComponent} from './public-list.component';

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
    ],
    declarations: [
        SchemePublicListComponent,
    ],
    exports: [
        SchemePublicListComponent,
    ],
})
export class SchemePublicListModule {}
