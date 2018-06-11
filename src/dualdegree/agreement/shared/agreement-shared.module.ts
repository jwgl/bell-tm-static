import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule } from '@angular/forms';

import {CommonDialogsModule } from 'core/common-dialogs';
import {CommonDirectivesModule } from 'core/common-directives';
import {Dialog } from 'core/dialogs';

import {AgreementFilterDialog} from './filter.dialog';
import {AgreementViewService} from './filter.service';
import {AgreementFormViewerComponent} from './form-viewer.component';
@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        FormsModule,
    ],
    declarations: [
        AgreementFormViewerComponent,
        AgreementFilterDialog,
    ],
    entryComponents: [
        AgreementFilterDialog,
    ],
    providers: [
        Dialog,
        AgreementViewService,
    ],
    exports: [
        AgreementFormViewerComponent,
        AgreementFilterDialog,
    ],
})
export class AgreementSharedModule {}
