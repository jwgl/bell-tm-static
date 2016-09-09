import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentInfoComponent} from './student-info.component';
import {ReissueFormViewerComponent} from './form-viewer.component';
import {FormStatusPipe} from './form-status.pipe';

export {
    StudentInfoComponent,
    ReissueFormViewerComponent,
}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        StudentInfoComponent,
        ReissueFormViewerComponent,
        FormStatusPipe,
    ],
    exports: [
        StudentInfoComponent,
        ReissueFormViewerComponent,
        FormStatusPipe,
    ],
})
export class ReissueCommonModule {}
