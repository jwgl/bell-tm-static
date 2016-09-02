import {NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {RestModule} from 'core/rest';

import {PlanCommonModule} from '../../../common/module';
import {SchemeViewerModule} from '../../common/scheme-viewer.module';
import {SchemePublicItemComponent} from './public-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        RestModule.for('/api/schemes'),
        SchemeViewerModule,
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
