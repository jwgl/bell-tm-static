import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {RestModule} from 'core/rest';

import {TeacherSelectComponent} from '../../../shared/components/teacher-select.component';

import {MentorFormDialog} from './editor/form-editor.component';
import {MentorRoutingModule} from './form-routing.module';
import {MentorViewComponent} from './form.component';
import {MentorFormService} from './form.service';
import {MentorListComponent} from './list/form-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/dualdegree/departments/${departmentId}/mentors'),
        CommonDialogsModule,
        CommonDirectivesModule,
        MentorRoutingModule,
    ],
    declarations: [
        MentorListComponent,
        MentorViewComponent,
        TeacherSelectComponent,
        MentorFormDialog,
    ],
    providers: [
        Dialog,
        MentorFormService,
    ],
    entryComponents: [
        MentorFormDialog,
    ],
    bootstrap: [
        MentorViewComponent,
    ],
})
class MentorFormModule {}

platformBrowserDynamic().bootstrapModule(MentorFormModule);
