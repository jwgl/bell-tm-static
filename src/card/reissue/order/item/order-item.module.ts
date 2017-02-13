import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueSharedModule} from '../../shared/reissue-shared.module';
import {ReissueOrderItemComponent} from './order-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueOrderItemComponent,
    ],
    exports: [
        ReissueOrderItemComponent,
    ],
})
export class ReissueOrderItemModule {}
