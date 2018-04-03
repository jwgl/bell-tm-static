import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {ApplicationSharedModule} from '../shared/application-shared.module';
import {ApplicationsAdministrateService} from './administrate.service';
import {ApplicationsAdministrateItemComponent} from './item.component';
import {ApplicationListComponent} from './list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        RouterModule,
        ApplicationSharedModule,
    ],
    declarations: [
        ApplicationListComponent,
        ApplicationsAdministrateItemComponent,
    ],
    providers: [
        ApplicationsAdministrateService,
    ],
    exports: [
        ApplicationListComponent,
        ApplicationsAdministrateItemComponent,
    ],
})
export class ApplicationsAdministrateModule {}
