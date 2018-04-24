import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { RestModule } from 'core/rest';

import { MajorGroupPipe } from '../../shared/pipes/major-group';

import { AgreementFormViewerComponent } from '../shared/form-viewer.component';

import { AgreementFormEditorComponent } from './editor/form-editor.component';
import { MajorDialog } from './editor/major-item/major.dialog';
import { AgreementRoutingModule } from './form-routing.module';
import { AgreementViewComponent } from './form.component';
import { AgreementFormService } from './form.service';
import { AgreementItemComponent } from './item/item.component';
import { AgreementFilterDialog } from './list/filter.dialog';
import { AgreementListComponent } from './list/form-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/dualdegree/agreements'),
        CommonDialogsModule,
        CommonDirectivesModule,
        AgreementRoutingModule,
    ],
    declarations: [
        AgreementFormEditorComponent,
        AgreementListComponent,
        AgreementViewComponent,
        AgreementItemComponent,
        AgreementFormViewerComponent,
        MajorGroupPipe,
        MajorDialog,
        AgreementFilterDialog,
    ],
    providers: [
        Dialog,
        AgreementFormService,
    ],
    entryComponents: [
        MajorDialog,
        AgreementFilterDialog,
    ],
    bootstrap: [
        AgreementViewComponent,
    ],
})
export class AgreementFormModule { }
