import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {PlanSharedModule} from '../../../shared/module';
import {SchemePublicViewerModule} from '../../shared/public-viewer/scheme-viewer.module';
import {SchemePublicItemComponent} from './public-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
        SchemePublicViewerModule,
    ],
    declarations: [
        SchemePublicItemComponent,
    ],
    exports: [
        SchemePublicItemComponent,
    ],
    providers: [
        Title,
    ],
})
export class SchemePublicItemModule {}
