import {NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {RestModule} from '../../../../core/http';
import {PlanCommonModule} from '../../../common/module';
import {SchemeViewerComponent} from '../../common/scheme-viewer.component';
import {SchemePublicItemComponent} from './public-item.component';


@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        RestModule.for('/api/schemes'),
    ],
    declarations: [
        SchemePublicItemComponent,
        SchemeViewerComponent,
    ],
    exports: [
        SchemePublicItemComponent,
    ],
    providers: [
        Title,
    ],
})
export class SchemePublicItemModule {}
