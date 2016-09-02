import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RestModule} from 'core/rest';

import {PlanCommonModule} from '../../../common/module';
import {VisionPublicListComponent} from './public-list.component';

@NgModule({
    imports: [
        CommonModule,
        RestModule.for('/api/visions'),
        PlanCommonModule,
    ],
    declarations: [
        VisionPublicListComponent,
    ],
    exports: [
        VisionPublicListComponent,
    ],
})
export class VisionPublicListModule {}
