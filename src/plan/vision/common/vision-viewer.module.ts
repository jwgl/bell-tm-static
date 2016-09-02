import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanCommonModule} from '../../common/module';
import {VisionViewerComponent} from './vision-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        VisionViewerComponent,
    ],
    exports: [
        VisionViewerComponent,
    ],
})
export class VisionViewerModule {}
