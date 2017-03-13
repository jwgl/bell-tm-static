import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueFormNoticeComponent} from './form-notice.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
    ],
    declarations: [
        ReissueFormNoticeComponent,
    ],
    exports: [
        ReissueFormNoticeComponent,
    ],
})
export class ReissueFormNoticeModule {}
