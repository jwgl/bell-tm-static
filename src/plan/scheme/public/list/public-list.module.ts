import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PlanCommonModule} from '../../../common/module';
import {SchemePublicListComponent} from './public-list.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
    ],
    declarations: [
        SchemePublicListComponent,
    ],
    exports: [
        SchemePublicListComponent,
    ],
})
export class SchemePublicListModule {}
