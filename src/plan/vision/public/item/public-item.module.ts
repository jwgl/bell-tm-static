import {NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {RestModule} from '../../../../core/http';
import {PlanCommonModule} from '../../../common/module';
import {VisionViewerModule} from '../../common/vision-viewer.module';
import {VisionPublicItemComponent} from './public-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        RestModule.for('/api/visions'),
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
