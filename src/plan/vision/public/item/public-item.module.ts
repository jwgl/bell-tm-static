import {NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {RestModule} from '../../../../core/http';
import {PlanCommonModule} from '../../../common/module';
import {VisionViewerComponent} from '../../common/vision-viewer.component';
import {VisionPublicItemComponent} from './public-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        RestModule.for('/api/visions'),
    ],
    declarations: [
        VisionPublicItemComponent,
        VisionViewerComponent,
    ],
    exports: [
        VisionPublicItemComponent,
    ],
    providers: [
        Title,
    ],
})
export class VisionPublicItemModule {}
