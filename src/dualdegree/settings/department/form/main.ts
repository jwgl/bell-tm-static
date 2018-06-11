import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {RestModule} from 'core/rest';

import {TeacherSelectComponent} from '../../../shared/components/teacher-select.component';

import {MajorGroupPipe} from '../../shared/pipes/major-group';

import {DeptAdminDialog} from './editor/form-editor.component';
import {DeptAdminRoutingModule} from './form-routing.module';
import {DeptAdminViewComponent} from './form.component';
import {DeptAdminFormService} from './form.service';
import {DeptAdminListComponent} from './list/form-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/dualdegree/settings/users'),
        CommonDialogsModule,
        CommonDirectivesModule,
        DeptAdminRoutingModule,
    ],
    declarations: [
        DeptAdminListComponent,
        DeptAdminViewComponent,
        TeacherSelectComponent,
        DeptAdminDialog,
    ],
    providers: [
        Dialog,
        DeptAdminFormService,
    ],
    entryComponents: [
        DeptAdminDialog,
    ],
    bootstrap: [
        DeptAdminViewComponent,
    ],
})
class DeptAdminFormModule {}

platformBrowserDynamic().bootstrapModule(DeptAdminFormModule);
