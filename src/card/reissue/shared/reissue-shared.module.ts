import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormStatusPipe} from './form-status.pipe';
import {ReissueFormViewerComponent} from './form-viewer.component';
import {StudentInfoComponent} from './student-info.component';

export {
    StudentInfoComponent,
    ReissueFormViewerComponent,
};

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
export class ReissueSharedModule {}
