import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {FreeListenSharedModule} from '../../shared/free-listen-shared.module';
import {FreeListenFormListComponent} from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        RouterModule,
        FreeListenSharedModule,
    ],
    declarations: [
        FreeListenFormListComponent,
    ],
    exports: [
        FreeListenFormListComponent,
    ],
})
export class FreeListenFormListModule {}
