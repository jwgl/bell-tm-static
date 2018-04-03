import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from 'core/common-directives';

import {ApplicationFormViewerComponent} from './form-viewer.component';
import {TypeTextPipe} from './pipes/paper-type';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        ApplicationFormViewerComponent,
        TypeTextPipe,
    ],
    exports: [
        ApplicationFormViewerComponent,
    ],
})
export class ApplicationSharedModule {}
