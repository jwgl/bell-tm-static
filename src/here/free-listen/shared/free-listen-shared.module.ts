import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from 'core/common-directives';

import {FreeFormViewerComponent} from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FreeFormViewerComponent,
    ],
    exports: [
        FreeFormViewerComponent,
    ],
})
export class FreeListenSharedModule {}
