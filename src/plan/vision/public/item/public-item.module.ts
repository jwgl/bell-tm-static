import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {PlanSharedModule} from '../../../shared/module';
import {VisionViewerModule} from '../../shared/vision-viewer.module';
import {VisionPublicItemComponent} from './public-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionPublicItemComponent,
    ],
    exports: [
        VisionPublicItemComponent,
    ],
    providers: [
        Title,
    ],
})
export class VisionPublicItemModule {}
