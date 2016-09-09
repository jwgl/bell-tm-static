import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogsModule} from 'core/common-dialogs';

import {ReissueCommonModule} from '../../common/reissue-common.module';
import {ReissueOrderItemComponent} from './order-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        ReissueCommonModule,
    ],
    declarations: [
        ReissueOrderItemComponent,
    ],
    exports: [
        ReissueOrderItemComponent,
    ],
})
export class ReissueOrderItemModule {}
