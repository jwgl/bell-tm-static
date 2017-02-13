import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

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
