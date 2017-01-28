import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {LeaveFormViewerComponent} from './form-viewer.component';
import {LeaveTypePipe} from './leave-type.pipe';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        LeaveFormViewerComponent,
        LeaveTypePipe,
    ],
    exports: [
        LeaveFormViewerComponent,
        LeaveTypePipe,
    ],
})
export class LeaveSharedModule {}
