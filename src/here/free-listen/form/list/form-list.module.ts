import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {FreeSharedModule} from '../../shared/free-shared.module';
import {FreeFormListComponent} from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
        FreeSharedModule,
    ],
    declarations: [
        FreeFormListComponent,
    ],
    exports: [
        FreeFormListComponent,
    ],
})
export class FreeFormListModule {}
