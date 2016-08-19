import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestModule} from '../../../../core/http';
import {PlanCommonModule} from '../../../common/module';
import {SchemePublicListComponent} from './public-list.component';

@NgModule({
    imports: [
        CommonModule,
        RestModule.for('/api/schemes'),
        PlanCommonModule,
    ],
    declarations: [
        SchemePublicListComponent,
    ],
    exports: [
        SchemePublicListComponent,
    ],
})
export class SchemePublicListModule {}
