import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {RestModule} from 'core/rest';

import {UploaderModule} from '../../../shared/uploader/uploader.module';
import {AwardFormViewerModule} from '../../shared/form-viewer.module';

import {ApplicationFormEditorComponent} from './editor/form-editor.component';
import {UploaderDialog} from './editor/uploader.dialog';
import {ApplicationRoutingModule} from './form-routing.module';
import {ApplicationViewComponent} from './form.component';
import {ApplicationFormService} from './form.service';
import {AwardItemComponent} from './item/award-item.component';
import {AwardViewService} from './item/award.service';
import {ApplicationFormItemModule} from './item/item.module';
import {AwardListComponent} from './list/form-list.component';
import {PaperFormService} from './paper-form.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/dualdegree/students/${userId}/applications'),
        CommonDialogsModule,
        CommonDirectivesModule,
        ApplicationRoutingModule,
        AwardFormViewerModule,
        ApplicationFormItemModule,
        UploaderModule,
    ],
    declarations: [
        ApplicationViewComponent,
        AwardListComponent,
        AwardItemComponent,
        ApplicationFormEditorComponent,
        UploaderDialog,
    ],
    providers: [
        Dialog,
        ApplicationFormService,
        AwardViewService,
        PaperFormService,
        {provide: 'AWARD_API_URL', useValue: '/api/dualdegree/awards'},
    ],
    entryComponents: [
        UploaderDialog,
    ],
    bootstrap: [
        ApplicationViewComponent,
    ],
})
export class ApplicationFormModule { }
