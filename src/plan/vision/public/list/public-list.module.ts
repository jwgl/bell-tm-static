import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PlanSharedModule} from '../../../shared/module';
import {VisionPublicListComponent} from './public-list.component';

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
    ],
    declarations: [
        VisionPublicListComponent,
    ],
    exports: [
        VisionPublicListComponent,
    ],
})
export class VisionPublicListModule {}
