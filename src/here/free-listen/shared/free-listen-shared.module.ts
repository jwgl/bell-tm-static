import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {FreeFormViewerComponent} from './form-viewer.component';
import {HereScheduleModule} from '../../shared/schedule/schedule.module';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        HereScheduleModule,
    ],
    declarations: [
        FreeFormViewerComponent,
    ],
    exports: [
        FreeFormViewerComponent,
    ],
})
export class FreeListenSharedModule {}
