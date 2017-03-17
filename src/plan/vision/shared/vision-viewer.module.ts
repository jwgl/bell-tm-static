import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from 'core/common-directives';

import {PlanSharedModule} from '../../shared/module';
import {VisionViewerComponent} from './vision-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
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
