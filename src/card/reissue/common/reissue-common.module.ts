import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentInfoComponent} from './student-info.component';
import {ReissueFormViewerComponent} from './form-viewer.component';

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
    ],
    exports: [
        StudentInfoComponent,
        ReissueFormViewerComponent,
    ],
})
export class ReissueCommonModule {}
