import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from 'core/common-directives';

import {AwardFormViewerComponent} from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        AwardFormViewerComponent,
    ],
    exports: [
        AwardFormViewerComponent,
    ],
})
export class AwardFormViewerModule {}
