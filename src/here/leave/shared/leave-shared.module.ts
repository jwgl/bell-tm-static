import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {LeaveFormViewerComponent} from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        LeaveFormViewerComponent,
    ],
    exports: [
        LeaveFormViewerComponent,
    ],
})
export class LeaveSharedModule {}
