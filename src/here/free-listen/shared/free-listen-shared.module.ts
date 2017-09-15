import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from 'core/common-directives';

import {FreeFormViewerComponent} from './form-viewer.component';
import {TimeslotLimitPipe} from './timeslot-limit.pipe';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FreeFormViewerComponent,
        TimeslotLimitPipe,
    ],
    exports: [
        FreeFormViewerComponent,
    ],
})
export class FreeListenSharedModule {}
