import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogsModule} from 'core/common-dialogs';

import {PlanCommonModule} from '../../../common/module';
import {SchemeInternalViewerModule} from '../../common/internal-viewer/scheme-viewer.module';
import {SchemeDepartmentItemComponent} from './department-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        CommonDialogsModule,
        SchemeInternalViewerModule,
    ],
    declarations: [
        SchemeDepartmentItemComponent,
    ],
    exports: [
        SchemeDepartmentItemComponent,
    ],
})
export class SchemeDepartmentItemModule {}
