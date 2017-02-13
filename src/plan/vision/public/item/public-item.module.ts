import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {PlanCommonModule} from '../../../common/module';
import {VisionViewerModule} from '../../common/vision-viewer.module';
import {VisionPublicItemComponent} from './public-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
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
