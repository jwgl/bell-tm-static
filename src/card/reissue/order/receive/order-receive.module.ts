import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueSharedModule} from '../../shared/reissue-shared.module';
import {ReissueOrderReceiveComponent} from './order-receive.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueOrderReceiveComponent,
    ],
    exports: [
        ReissueOrderReceiveComponent,
    ],
})
export class ReissueOrderReceiveModule {}
