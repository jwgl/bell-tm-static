import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from 'core/common-directives';

import {HereScheduleModule} from '../../shared/schedule/schedule.module';
import {FreeFormViewerComponent} from './form-viewer.component';

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
