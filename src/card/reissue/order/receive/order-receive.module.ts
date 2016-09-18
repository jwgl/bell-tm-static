import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueCommonModule} from '../../common/reissue-common.module';
import {ReissueOrderReceiveComponent} from './order-receive.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        ReissueCommonModule,
    ],
    declarations: [
        ReissueOrderReceiveComponent,
    ],
    exports: [
        ReissueOrderReceiveComponent,
    ],
})
export class ReissueOrderReceiveModule {}
