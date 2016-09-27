import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


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
